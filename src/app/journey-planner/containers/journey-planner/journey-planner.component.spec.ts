import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JourneyPlannerComponent } from './journey-planner.component';
import { StoreModule } from '@ngrx/store';
import { AppControlReducer } from '../../../app-controls/app-controls.reducer';
import { JourneyMapReducer } from '../../../journey-map/journey-map.reducer';

describe('JourneyPlannerComponent', () => {
  let component: JourneyPlannerComponent;
  let fixture: ComponentFixture<JourneyPlannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          [AppControlReducer.name]: AppControlReducer.reducer,
          [JourneyMapReducer.name]: JourneyMapReducer.reducer,
        }),
      ],
      declarations: [ JourneyPlannerComponent ],
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
