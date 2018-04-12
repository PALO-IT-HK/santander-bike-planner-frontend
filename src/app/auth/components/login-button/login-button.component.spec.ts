import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginButtonComponent } from './login-button.component';
import { StoreModule } from '@ngrx/store';

import { AWSService } from '../../services/aws.service';
import { AWSServiceMock } from '../../services/aws.service.mock';
import { GoogleService } from '../../services/google.service';
import { GoogleServiceMock } from '../../services/google.service.mock';
import { AuthReducer } from '../../auth.reducer';

describe('LoginButtonComponent', () => {
  let component: LoginButtonComponent;
  let fixture: ComponentFixture<LoginButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        StoreModule.forRoot({
          [AuthReducer.name]: AuthReducer.reducer,
        })
      ],
      declarations: [ LoginButtonComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [{
        provide: GoogleService,
        useClass: GoogleServiceMock,
      }, {
        provide: AWSService,
        useClass: AWSServiceMock,
      }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
