import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaceSearchResultComponent } from './place-search-result.component';

describe('PlaceSearchResultComponent', () => {
  let component: PlaceSearchResultComponent;
  let fixture: ComponentFixture<PlaceSearchResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaceSearchResultComponent ],
      schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaceSearchResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
