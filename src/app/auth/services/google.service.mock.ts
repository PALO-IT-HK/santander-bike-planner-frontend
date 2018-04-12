import { Injectable } from '@angular/core';

import { AWSService } from './aws.service';

declare const gapi: any;

@Injectable()
export class GoogleServiceMock {
  clientId = '';

  private scope = [
    'profile',
    'email',
    'https://www.googleapis.com/auth/plus.me',
  ].join(' ');

  public auth2: any;

  public googleInit(element) {
    return;
  }

  public attachSignin(element) {
    return;
  }

  constructor(public awsService: AWSService) { }
}
