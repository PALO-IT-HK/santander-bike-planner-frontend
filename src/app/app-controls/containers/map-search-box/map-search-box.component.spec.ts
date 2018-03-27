import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapSearchBoxComponent } from './map-search-box.component';
import { StoreModule } from '@ngrx/store';
import { RootReducer } from '../../../reducers';

import { PlaceService } from '../../../bikepoints';
import { PlaceServiceMock } from '../../../bikepoints/services/place.service.mock';
import { AppControlReducer } from '../../app-controls.reducer';

describe('MapSearchBoxComponent', () => {
  let component: MapSearchBoxComponent;
  let fixture: ComponentFixture<MapSearchBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        StoreModule.forRoot({
          [AppControlReducer.name]: AppControlReducer.reducer
        }),
      ],
      declarations: [ MapSearchBoxComponent ],
      providers: [{
        provide: PlaceService,
        useClass: PlaceServiceMock,
      }],
      schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapSearchBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
