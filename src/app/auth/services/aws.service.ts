import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as AWS from 'aws-sdk';

import { AuthReducer } from '../auth.reducer';
import { AuthActions } from '../auth.action';

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
  ) {
    AWS.config.update({
      region: this.region,
      credentials: new AWS.CognitoIdentityCredentials({
        IdentityPoolId: '',
      }),
    });
  }

  authenticateGoogle(authResult, region, profile) {
    console.log(authResult);
    // Add the Google access token to the Cognito credentials login map.
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: this.identityPool,
      Logins: {
        'accounts.google.com': authResult['id_token']
      }
    });

    // Obtain AWS credentials
    AWS.config.getCredentials(() => {
      // Upon login to Cognito and Obtained STS token, store the google profile locally
      this.store.dispatch(new AuthActions.SetUserAction({
        firstName: profile.ofa,
        lastName: profile.wea,
        email: profile.U3,
        avatar: profile.Paa,
        displayName: profile.ig,
      }));

      // TODO: we should also persist the profile into user data via Cognito Sync
      console.log(AWS.config.credentials);

      // TODO: persistence login session across refresh
    });
  }
}
