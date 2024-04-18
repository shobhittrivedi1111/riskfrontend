import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCompanyFormulaComponent } from './add-company-formula.component';

describe('AddCompanyFormulaComponent', () => {
  let component: AddCompanyFormulaComponent;
  let fixture: ComponentFixture<AddCompanyFormulaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddCompanyFormulaComponent]
    });
    fixture = TestBed.createComponent(AddCompanyFormulaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
