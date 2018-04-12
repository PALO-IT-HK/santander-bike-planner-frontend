import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginSplashScreenComponent } from './login-splash-screen.component';

describe('LoginSplashScreenComponent', () => {
  let component: LoginSplashScreenComponent;
  let fixture: ComponentFixture<LoginSplashScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginSplashScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginSplashScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
