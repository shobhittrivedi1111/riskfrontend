import { TestBed } from '@angular/core/testing';

import { CompanyRiskScoreService } from './company-risk-score.service';

describe('CompanyRiskScoreService', () => {
  let service: CompanyRiskScoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompanyRiskScoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
