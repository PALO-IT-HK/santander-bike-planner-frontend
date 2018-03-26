import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BikepointsSearchResultComponent } from './bikepoints-search-result.component';

describe('BikepointsSearchResultComponent', () => {
  let component: BikepointsSearchResultComponent;
  let fixture: ComponentFixture<BikepointsSearchResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BikepointsSearchResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BikepointsSearchResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
