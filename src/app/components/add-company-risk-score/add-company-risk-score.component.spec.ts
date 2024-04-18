import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCompanyRiskScoreComponent } from './add-company-risk-score.component';

describe('AddCompanyRiskScoreComponent', () => {
  let component: AddCompanyRiskScoreComponent;
  let fixture: ComponentFixture<AddCompanyRiskScoreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddCompanyRiskScoreComponent]
    });
    fixture = TestBed.createComponent(AddCompanyRiskScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
