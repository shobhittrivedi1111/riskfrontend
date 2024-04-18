import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCompanyRiskScoreComponent } from './update-company-risk-score.component';

describe('UpdateCompanyRiskScoreComponent', () => {
  let component: UpdateCompanyRiskScoreComponent;
  let fixture: ComponentFixture<UpdateCompanyRiskScoreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateCompanyRiskScoreComponent]
    });
    fixture = TestBed.createComponent(UpdateCompanyRiskScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
