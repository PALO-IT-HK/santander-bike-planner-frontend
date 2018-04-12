import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentLocationComponent } from './current-location.component';
import { StoreModule } from '@ngrx/store';

import { PlaceService } from '../../../bikepoints/services/place.service';
import { PlaceServiceMock } from '../../../bikepoints/services/place.service.mock';
import { JourneyMapReducer } from '../../journey-map.reducer';

describe('CurrentLocationComponent', () => {
  let component: CurrentLocationComponent;
  let fixture: ComponentFixture<CurrentLocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        StoreModule.forRoot({
          [JourneyMapReducer.name]: JourneyMapReducer.reducer
        }),
      ],
      declarations: [ CurrentLocationComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [{
        provide: PlaceService,
        useClass: PlaceServiceMock,
      }],

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
