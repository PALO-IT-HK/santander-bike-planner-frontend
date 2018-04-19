import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { SessionStorageService, SessionStorage } from 'ngx-webstorage';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as AWS from 'aws-sdk';
import 'amazon-cognito-js';

import { AuthReducer } from '../auth.reducer';
import { AuthActions } from '../auth.action';
import { GoogleUserInfo } from '../models/google-user';

export interface Callback {
  googleCallback(creds: any, profile: any);
  googleCallbackWithData(data: any);
}

@Injectable()
export class AWSService {
  readonly cognitoDataSet = 'CLPJourneyPlanner';
  identityPool = 'ap-southeast-1:7eaf61c0-5fb3-4fca-affb-59015720b561'; // CognitoIdentityPool
  region = 'ap-southeast-1'; // AWS Region

  token: any;
  private AWSSync: any;
  private syncManager: any;

  constructor(
    private http: HttpClient,
    private store: Store<AuthReducer.State>,
    private sessionStore: SessionStorageService,
  ) {
    AWS.config.update({
      region: this.region,
      credentials: new AWS.CognitoIdentityCredentials({
        IdentityPoolId: '',
      }),
    });

    const idToken: string = this.sessionStore.retrieve('idToken');
    const profile: GoogleUserInfo = this.sessionStore.retrieve('profile');

    // console.log({idToken, profile});
    if (idToken && profile) {
      this.loadCredentials(idToken, profile).then(() => {}, () => {});
    }
  }

  loadCredentials(idToken, profile) {
    return new Promise((resolve, reject) => {
      console.log({
        msg: 'loading credentials',
        idToken,
        profile,
      });
      // Add the Google access token to the Cognito credentials login map.
      AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: this.identityPool,
        Logins: {
          'accounts.google.com': idToken,
        }
      });

      // Obtain AWS credentials
      AWS.config.getCredentials((err) => {
        if (err) {
          // console.log(err);
          this.store.dispatch(new AuthActions.SetUserAction(null));
          this.sessionStore.clear();
          reject(err);
        } else {
          const userProfile: GoogleUserInfo = {
            firstName: profile.firstName || profile.getGivenName(),
            lastName: profile.lastName || profile.getFamilyName(),
            email: profile.email || profile.getEmail(),
            avatar: profile.avatar || profile.getImageUrl(),
            displayName: profile.displayName || profile.getName(),
          };
          // Upon login to Cognito and Obtained STS token, store the google profile locally
          this.sessionStore.store('idToken', idToken);
          this.sessionStore.store('profile', userProfile);
          this.store.dispatch(new AuthActions.SetUserAction(userProfile));

          this.AWSSync = AWS;
          this.syncManager = new this.AWSSync.CognitoSyncManager();
          this.store.dispatch(new AuthActions.ObtainCognitoDataAction());

          resolve(true);
        }
      });
    });
  }

  authenticateGoogle(authResult, region, profile) {
    // console.log(authResult);
    return this.loadCredentials(authResult['id_token'], profile)
      .then(() => {
        // There is an issue with user without Redux DevTools that could not get action properly dispatched
        //   when the action is issued by the google oauth authentication flow
        //
        // As a workaround, we need to reload the page once we have a fresh login
        window.location.reload(true);
      });
  }

  obtainCognitoUserData(key) {
    return this.openOrCreateDataset(this.cognitoDataSet)
      .then((dataset) => this.synchronizeDataset(dataset)) // Synchronize dataset from Cognito to get latest data
      .then((dataset) => new Promise<any>((resolve, reject) => {
        dataset.get(key, (err, value) => {
          // console.log({ err, value });
          if (err) {
            return reject(err);
          }
          if (value) {
            return resolve(JSON.parse(value));
          } else {
            return resolve();
          }
        });
      }));
  }

  updateCognitoUserData(key, data) {
    return this.openOrCreateDataset(this.cognitoDataSet)
      .then((dataset) => this.synchronizeDataset(dataset)) // Synchronize dataset from Cognito to get latest data
      .then((dataset) => new Promise<any>((resolve, reject) => {
        dataset.put(key, JSON.stringify(data), (err, record) => {
          // console.log({ err, record });
          if (err) {
            return reject(err);
          }

          return resolve(dataset);
        });
      }))
      .then((dataset) => this.synchronizeDataset(dataset)); // Synchronize dataset to Cognito to save the updated data
  }

  private openOrCreateDataset(datasetName) {
    return new Promise<any>((resolve, reject) => {
      this.syncManager.openOrCreateDataset(datasetName, (err, dataset) => {
        if (err) {
          return reject(err);
        }
        return resolve(dataset);
      });
    });
  }

  private synchronizeDataset(dataset) {
    return new Promise<any>((resolve, reject) => {
      dataset.synchronize({
        onSuccess: (data, newRecords) => {
          // console.log({ data, newRecords });
          return resolve(data);
        },

        onFailure: (err) => {
          // console.log({ err });
          return reject(err);
        },

        onConflict: (data, conflicts, callback) => {
          console.log({ msg: 'conflict occurred', data, conflicts });
          const resolved = conflicts.reduce((res, conflict) => [...res, conflict.resolveWithRemoteRecord()], []);
          data.resolve(resolved, () => callback(true));
        },

        onDatasetDeleted: (data, datasetName, callback) => {
          console.log({ msg: 'dataset deleted', data, datasetName });
          return callback(true);
        },

        onDatasetsMerged: (data, datasetNames, callback) => {
          console.log({ msg: 'dataset merged', data, datasetNames });
          return callback(true);
        }
      });
    });
  }
}
