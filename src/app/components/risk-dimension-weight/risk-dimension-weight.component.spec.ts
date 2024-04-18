import { ComponentFixture, TestBed } from '@angular/core/testing';
import {RiskDimensionWeightComponent } from './risk-dimension-weight.component';

describe('RiskDimensionWeightComponent', () => {
  let component: RiskDimensionWeightComponent;
  let fixture: ComponentFixture<RiskDimensionWeightComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RiskDimensionWeightComponent]
    });
    fixture = TestBed.createComponent(RiskDimensionWeightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
