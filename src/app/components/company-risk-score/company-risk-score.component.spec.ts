import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyRiskScoreComponent } from './company-risk-score.component';

describe('CompanyRiskScoreComponent', () => {
  let component: CompanyRiskScoreComponent;
  let fixture: ComponentFixture<CompanyRiskScoreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompanyRiskScoreComponent]
    });
    fixture = TestBed.createComponent(CompanyRiskScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
