import { TestBed } from '@angular/core/testing';

import { FormulaVariablesService } from './formula-variables.service';

describe('FormulaVariablesService', () => {
  let service: FormulaVariablesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormulaVariablesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
