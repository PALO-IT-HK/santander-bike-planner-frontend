import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { SessionStorageService, SessionStorage } from 'ngx-webstorage';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as AWS from 'aws-sdk';

import { AuthReducer } from '../auth.reducer';
import { AuthActions } from '../auth.action';
import { GoogleUserInfo } from '../models/google-user';

export interface Callback {
  googleCallback(creds: any, profile: any);
  googleCallbackWithData(data: any);
}

@Injectable()
export class AWSService {
  token: any;

  identityPool = 'ap-southeast-1:7eaf61c0-5fb3-4fca-affb-59015720b561'; // CognitoIdentityPool
  region = 'ap-southeast-1'; // AWS Region

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

    if (idToken && profile) {
      this.loadCredentials(idToken, profile);
    }
  }

  loadCredentials(id_token, profile) {
    // Add the Google access token to the Cognito credentials login map.
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: this.identityPool,
      Logins: {
        'accounts.google.com': id_token,
      }
    });

    // Obtain AWS credentials
    AWS.config.getCredentials((err) => {
      if (err) {
        console.log(err);
        this.store.dispatch(new AuthActions.SetUserAction(null));
        this.sessionStore.clear();
        return;
      } else {
        const userProfile: GoogleUserInfo = {
          firstName: profile.ofa,
          lastName: profile.wea,
          email: profile.U3,
          avatar: profile.Paa,
          displayName: profile.ig,
        };
        // Upon login to Cognito and Obtained STS token, store the google profile locally
        this.store.dispatch(new AuthActions.SetUserAction(userProfile));

        // TODO: we should also persist the profile into user data via Cognito Sync
        console.log(AWS.config.credentials);

        this.sessionStore.store('idToken', id_token);
        this.sessionStore.store('profile', userProfile);
      }
    });
  }

  authenticateGoogle(authResult, region, profile) {
    console.log(authResult);
    this.loadCredentials(authResult['id_token'], profile);
  }
}
