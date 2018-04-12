import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';

// Material UI Module
import { MaterialModule } from '../material.module';

import { AWSService } from './services/aws.service';
import { GoogleService } from './services/google.service';
import { LoginButtonComponent } from './components/login-button/login-button.component';

import { AuthReducer } from './auth.reducer';
import { AvatarComponent } from './components/avatar/avatar.component';
import { LoginSplashScreenComponent } from './containers/login-splash-screen/login-splash-screen.component';

/**
 *  Authentication Module with AWS Cognito
 */
@NgModule({
  imports: [
    CommonModule,
    MaterialModule,

    StoreModule.forFeature(AuthReducer.name, AuthReducer.reducer),
  ],
  declarations: [
    LoginButtonComponent,
    AvatarComponent,
    LoginSplashScreenComponent
  ],
  providers: [
    AWSService,
    GoogleService,
  ],
  exports: [
    LoginButtonComponent,
    AvatarComponent,
    LoginSplashScreenComponent
  ],
})
export class AuthModule { }
