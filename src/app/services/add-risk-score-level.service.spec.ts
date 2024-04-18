import { TestBed } from '@angular/core/testing';

import { AddRiskScoreLevelService } from './add-risk-score-level.service';

describe('AddRiskScoreLevelService', () => {
  let service: AddRiskScoreLevelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddRiskScoreLevelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
