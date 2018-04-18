import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BikepointInfoComponent } from './bikepoint-info.component';
import { MaterialModule } from '../../../material.module';

describe('BikepointInfoComponent', () => {
  let component: BikepointInfoComponent;
  let fixture: ComponentFixture<BikepointInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule],
      declarations: [ BikepointInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BikepointInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
