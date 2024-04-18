import { TestBed } from '@angular/core/testing';

import { AddRiskDimensionWeightService } from './add-risk-dimension-weight.service';

describe('AddRiskDimensionWeightService', () => {
  let service: AddRiskDimensionWeightService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddRiskDimensionWeightService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
