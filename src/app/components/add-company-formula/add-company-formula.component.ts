import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreServiceService } from 'src/app/core/core-service.service';
import { AddCompanyFormulaService } from 'src/app/services/add-company-formula.service';
import { FormulaVariablesService } from 'src/app/services/formula-variables.service';

@Component({
  selector: 'app-add-company-formula',
  templateUrl: './add-company-formula.component.html',
  styleUrls: ['./add-company-formula.component.css']
})
export class AddCompanyFormulaComponent implements OnInit {
  formulaForm: FormGroup;
  formulaList: string[] = [];
  addedFormulas: string[] = [];

  constructor(
    private _fb: FormBuilder,
    private _formulaService: AddCompanyFormulaService,
    private _dialogRef: MatDialogRef<AddCompanyFormulaComponent>,
    private _formulaVariables: FormulaVariablesService,
    private _coreService: CoreServiceService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.formulaForm = this._fb.group({
      elementName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z_]+$/)]],
      formula: [''],
      // [Validators.required, Validators.pattern(/^(?!0)\b[a-zA-Z0-9_,+\-*\/\^()']+$/)]
      selectedFormula: [''],
      selectedOperator: ['+'],
      numberInput: [''], // Add the number input field to the form
    });
  }

  ngOnInit(): void {
    this.getAllFormulaVariables();
    if (this.data) {
      // Auto-fill formula for edit mode
      this.formulaForm.patchValue({
        elementName: this.data.elementName,
        formula: this.data.formula,
      });
      this.addedFormulas = [this.data.formula];
    }
    else {
      this.formulaForm.get('formula')?.valueChanges.subscribe((value) => {
        // Whenever the "Formula" field is manually edited, update the addedFormulas array accordingly
        this.addedFormulas = [value];
      });
  }
}

  getAllFormulaVariables() {
    this._formulaVariables.getAllVariables().subscribe({
      next: (res: any) => {
        this.formulaList = res; // Assuming res contains the list of formulas as an array of strings
      },
      error: console.log,
    });
  }

  onFormulaSelectionChange(selectedFormula: string) {
    this.formulaForm.get('selectedFormula')?.patchValue(selectedFormula);
  }

  onOperatorSelectionChange(selectedOperator: string) {
    this.formulaForm.get('selectedOperator')?.patchValue(selectedOperator);
  }

  addSelectedFormula() {
    const selectedFormula = this.formulaForm.get('selectedFormula')?.value || '';
    this.addedFormulas.push(selectedFormula);
    this.updateFinalFormula();
  }

  addSelectedOperator() {
    const selectedOperator = this.formulaForm.get('selectedOperator')?.value || '';
    this.addedFormulas.push(selectedOperator);
    this.updateFinalFormula();
  }

  updateFinalFormula() {
    this.formulaForm.get('selectedFormula')?.patchValue('');
    this.formulaForm.get('selectedOperator')?.patchValue('');
    this.formulaForm.get('formula')?.patchValue(this.addedFormulas.join(''));
  }
  addNumberToFormula() {
    const numberInput = this.formulaForm.get('numberInput')?.value || '';
    this.addedFormulas.push(numberInput);
    this.updateFinalFormula();
  }

  onSaveClicked() {
    if (this.formulaForm.valid) {
      const finalFormula = this.formulaForm.get('formula')?.value || '';

      // Final formula will be the joined version of addedFormulas array
    //  const finalFormula = this.addedFormulas.join('');

      if (this.data) {
        this._formulaService.updateFormula(this.data.id, { ...this.formulaForm.value, formula: finalFormula }).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Formula Details Updated');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.log(err);
            this._coreService.openSnackBar(err.error.errorDetails);
          },
        });
      } else {
        console.log(finalFormula);
        this._formulaService.addFormula({ ...this.formulaForm.value, formula: finalFormula }).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Formula added Successfully');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.log(err);
            this._coreService.openSnackBar(err.error.errorDetails);
          },
        });
      }
    }
  }
}