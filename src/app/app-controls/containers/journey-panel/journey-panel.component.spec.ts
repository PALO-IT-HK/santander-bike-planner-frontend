import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JourneyPanelComponent } from './journey-panel.component';
import { StoreModule } from '@ngrx/store';
import { RootReducer } from '../../../reducers';

import { PlaceService } from '../../../bikepoints/services/place.service';
import { PlaceServiceMock } from '../../../bikepoints/services/place.service.mock';
import { AppControlReducer } from '../../app-controls.reducer';

describe('JourneyPlannerComponent', () => {
  let component: JourneyPanelComponent;
  let fixture: ComponentFixture<JourneyPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        StoreModule.forRoot({
          [AppControlReducer.name]: AppControlReducer.reducer
        }),
      ],
      declarations: [JourneyPanelComponent ],
      providers: [{
        provide: PlaceService,
        useClass: PlaceServiceMock,
      }],
      schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JourneyPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
