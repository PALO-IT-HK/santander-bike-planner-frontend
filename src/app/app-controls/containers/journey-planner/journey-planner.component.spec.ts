import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JourneyPlannerComponent } from './journey-planner.component';
import { StoreModule } from '@ngrx/store';
import { RootReducer } from '../../../reducers';

import { PlaceService } from '../../../bikepoints/services';
import { PlaceServiceMock } from '../../../bikepoints/services/place.service.mock';
import { AppControlReducer } from '../../app-controls.reducer';

describe('JourneyPlannerComponent', () => {
  let component: JourneyPlannerComponent;
  let fixture: ComponentFixture<JourneyPlannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        StoreModule.forRoot({
          [AppControlReducer.name]: AppControlReducer.reducer
        }),
      ],
      declarations: [ JourneyPlannerComponent ],
      providers: [{
        provide: PlaceService,
        useClass: PlaceServiceMock,
      }],
      schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JourneyPlannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
