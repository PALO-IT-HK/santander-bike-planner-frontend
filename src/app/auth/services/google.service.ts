import { Injectable } from '@angular/core';

import { AWSService } from './aws.service';

declare const gapi: any;

@Injectable()
export class GoogleService {
  clientId = '339959004994-gkb3pi3homkq8mq32e9ietnvid1dnk5p.apps.googleusercontent.com';

  private scope = [
    'profile',
    'email',
    'https://www.googleapis.com/auth/plus.me',
  ].join(' ');

  public auth2: any;

  public googleInit(element) {
    console.log('init');
    gapi.load('auth2', () => {
      console.log('load');
      this.auth2 = gapi.auth2.init({
        client_id: this.clientId,
        cookiepolicy: 'single_host_origin',
        scope: this.scope
      });
      this.attachSignin(element);
    });
  }

  public attachSignin(element) {
    this.auth2.attachClickHandler(element, {},
      (googleUser) => {
        const profile = googleUser.getBasicProfile();

        // console.log('Token || ' + googleUser.getAuthResponse().id_token);

        const authResponse = googleUser.getAuthResponse();
        // console.log(authResponse);

        console.log('Authenticated to Google!');

        // console.log('ID: ' + JSON.stringify(profile));
        this.awsService.authenticateGoogle(authResponse, this.awsService.region, profile);
      }, function (error) {
        console.log(JSON.stringify(error, undefined, 2));
      });
  }

  constructor(public awsService: AWSService) {}
}
