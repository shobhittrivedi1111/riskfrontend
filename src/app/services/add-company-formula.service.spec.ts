import { TestBed } from '@angular/core/testing';

import { AddCompanyFormulaService } from './add-company-formula.service';

describe('AddCompanyFormulaService', () => {
  let service: AddCompanyFormulaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddCompanyFormulaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
