import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRiskDimensionWeightComponent } from './add-risk-dimension-weight.component';

describe('AddRiskDimensionWeightComponent', () => {
  let component: AddRiskDimensionWeightComponent;
  let fixture: ComponentFixture<AddRiskDimensionWeightComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddRiskDimensionWeightComponent]
    });
    fixture = TestBed.createComponent(AddRiskDimensionWeightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
