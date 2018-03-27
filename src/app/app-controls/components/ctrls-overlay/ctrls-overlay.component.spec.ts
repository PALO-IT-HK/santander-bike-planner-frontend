import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CtrlsOverlayComponent } from './ctrls-overlay.component';
import { StoreModule } from '@ngrx/store';
import { RootReducer } from '../../../reducers';

import { PlaceService } from '../../../bikepoints/services';
import { PlaceServiceMock } from '../../../bikepoints/services/place.service.mock';
import { AppControlReducer } from '../../app-controls.reducer';

describe('CtrlsOverlayComponent', () => {
  let component: CtrlsOverlayComponent;
  let fixture: ComponentFixture<CtrlsOverlayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        StoreModule.forRoot({
          [AppControlReducer.name]: AppControlReducer.reducer
        }),
      ],
      declarations: [ CtrlsOverlayComponent ],
      providers: [{
        provide: PlaceService,
        useClass: PlaceServiceMock,
      }],
      schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CtrlsOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
