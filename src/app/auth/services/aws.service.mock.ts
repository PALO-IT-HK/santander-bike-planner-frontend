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
export class AWSServiceMock {
  token: any;

  identityPool = ''; // CognitoIdentityPool
  region = ''; // AWS Region

  constructor(
    private http: HttpClient,
    private store: Store<AuthReducer.State>,
  ) {
  }

  authenticateGoogle(authResult, region, profile) {
    return;
  }
}
