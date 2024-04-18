import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyFormulaComponent } from './company-formula.component';

describe('CompanyFormulaComponent', () => {
  let component: CompanyFormulaComponent;
  let fixture: ComponentFixture<CompanyFormulaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompanyFormulaComponent]
    });
    fixture = TestBed.createComponent(CompanyFormulaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
