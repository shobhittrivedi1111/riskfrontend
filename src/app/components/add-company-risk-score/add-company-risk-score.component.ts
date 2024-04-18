import { Component, OnInit, Inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreServiceService } from 'src/app/core/core-service.service';
import { CompanyRiskScoreService } from 'src/app/services/company-risk-score.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-company-risk-score',
  templateUrl: './add-company-risk-score.component.html',
  styleUrls: ['./add-company-risk-score.component.css']
})


export class AddCompanyRiskScoreComponent implements OnInit {
  companyForm: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private companyRiskScoreService: CompanyRiskScoreService,
    private _coreService: CoreServiceService
  ) {
    this.companyForm = this.formBuilder.group({
      companyName: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+(?: [a-zA-Z]+)*$')]],
      dimensions: this.formBuilder.array([this.createDimensionFormGroup()])
    });
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      const companyFormData = params['companyForm'];
      if (companyFormData) {
        try {
          const parsedFormData = JSON.parse(companyFormData);
          this.populateForm(parsedFormData);
        } catch (error) {
          console.error('Error parsing companyForm JSON:', error);
        }
      }
    });
  }

  // submitForm() {
  //   if (this.companyForm.valid) {
  //     const companyNameControl = this.companyForm.get('companyName');
  //     if (companyNameControl && companyNameControl.value.length < 3) {
  //       this._coreService.openSnackBar('Company Name must be at Least 3 Characters Long!');
  //       return; // Stop form submission
  //     }
  //     const formData = {
  //       companyName: this.companyForm.value.companyName,
  //       dimensions: {} as { [key: string]: number }
  //     };

  //     const dimensionsControl = this.companyForm.get('dimensions');
  //     if (dimensionsControl && dimensionsControl instanceof FormArray) {
  //       const dimensionControls = dimensionsControl.controls;
  //       for (const control of dimensionControls) {
  //         const keyControl = control.get('key');
  //         const valueControl = control.get('value');
  //         if (keyControl && valueControl && keyControl.value && valueControl.value) {
  //           const key = keyControl.value;
  //           const value = parseFloat(valueControl.value);
  //           formData.dimensions[key] = value;
  //         }
  //       }
  //     }

  //     console.log(formData);
  //     // Send data to the server
  //     this.companyRiskScoreService.addCompanyRiskScore(formData).subscribe(
  //       response => {
  //         console.log('Form data sent successfully:', response);
  //         this._coreService.openSnackBar('Company & Dimension Added Successfully');
  //         this.companyForm.reset();
  //       },
  //       (err:any)=>{
  //         console.log(err);
  //         this._coreService.openSnackBar(err.error.errorDetails);
  //       },
  //     );
  //   } else {
  //     this.displayFormErrors();
  //   }
  // }
  submitForm() {
    if (this.companyForm.valid) {
      const companyNameControl = this.companyForm.get('companyName');
      if (companyNameControl && companyNameControl.value.length < 3) {
        this._coreService.openSnackBar('Company Name must be at Least 3 Characters Long!');
        return; // Stop form submission
      }
      const formData = {
        companyName: this.companyForm.value.companyName,
        dimensions: {} as { [key: string]: number }
      };
  
      const dimensionsControl = this.companyForm.get('dimensions');
      if (dimensionsControl && dimensionsControl instanceof FormArray) {
        const dimensionControls = dimensionsControl.controls;
        const duplicateKeys: string[] = [];
        for (const control of dimensionControls) {
          const keyControl = control.get('key');
          const valueControl = control.get('value');
          if (keyControl && valueControl && keyControl.value && valueControl.value) {
            const key = keyControl.value;
            const value = parseFloat(valueControl.value);
  
            // Check if the key already exists in formData.dimensions (previously saved dimensions)
            if (formData.dimensions.hasOwnProperty(key)) {
              duplicateKeys.push(key);
            } else {
              formData.dimensions[key] = value;
            }
          }
        }
  
        // Check if there are any duplicate keys
        if (duplicateKeys.length > 0) {
          const errorMessage = `Duplicate Dimensions are not allowed,Duplicate Dimesnion Found: ${duplicateKeys.join(', ')}`;
          this._coreService.openSnackBar(errorMessage);
          return; // Stop form submission
        }
      }
  
      console.log(formData);
      // Send data to the server
      this.companyRiskScoreService.addCompanyRiskScore(formData).subscribe(
        response => {
          console.log('Form data sent successfully:', response);
          this._coreService.openSnackBar('Company & Dimension Added Successfully');
          this.companyForm.reset();
        },
        (err:any)=>{
          console.log(err);
          this._coreService.openSnackBar(err.error.errorDetails);
        },
      );
    } else {
      this.displayFormErrors();
    }
  }
  

  displayFormErrors() {
    this.companyForm.markAllAsTouched();
    this.companyForm.markAsDirty();

    const companyNameControl = this.companyForm.get('companyName');
    if (companyNameControl && companyNameControl.invalid) {
      if (companyNameControl.errors?.['required']) {
        this._coreService.openSnackBar('Please enter a Company Name.');
      } else if (companyNameControl.errors?.['pattern']) {
        this._coreService.openSnackBar('Invalid characters in the company name.');
      }
    }
    
    const dimensionsControl = this.companyForm.get('dimensions');
    if (dimensionsControl && dimensionsControl instanceof FormArray) {
      const dimensionControls = dimensionsControl.controls;
      for (const control of dimensionControls) {
        const keyControl = control.get('key');
        const valueControl = control.get('value');
        if (keyControl && keyControl.invalid) {
          this._coreService.openSnackBar('Please enter Valid Dimension Key');
        }
        else if(valueControl && valueControl.invalid ){
          this._coreService.openSnackBar('Please enter Valid Dimension Value');
        }
      }
    }
  }

  populateForm(data: any) {
    this.companyForm.patchValue({
      companyName: data.companyName
    });

    // Clear existing dimensions
    const dimensionsControl = this.companyForm.get('dimensions') as FormArray;
    dimensionsControl.clear();

    // Populate dimensions
    const dimensions = data.dimensions as { key: string, value: string }[];
    dimensions.forEach(dimension => {
      dimensionsControl.push(this.createDimensionFormGroup(dimension.key, dimension.value));
    });
  }

  createDimensionFormGroup(key = '', value = ''): FormGroup {
    return this.formBuilder.group({
      key: [key, [Validators.required, Validators.pattern('[a-zA-Z]+')]],
      value: [value, [Validators.required, Validators.pattern('[1-9][0-9]*')]]
    });
  }

  get dimensions(): FormArray {
    return this.companyForm.get('dimensions') as FormArray;
  }

  // addDimension() {
  //   this.dimensions.push(this.createDimensionFormGroup());
  // }
  addDimension() {
    const dimensions = this.companyForm.get('dimensions') as FormArray;
    const newDimension = this.createDimensionFormGroup();
  
    // Check if the new dimension key already exists
    const newDimensionKeyControl = newDimension.get('key');
    if (newDimensionKeyControl && this.dimensionExists(newDimensionKeyControl.value)) {
      this._coreService.openSnackBar('This dimension key already exists.');
      return; // Stop adding the dimension
    }
  
    dimensions.push(newDimension);
  }
  
  // Helper method to check if the dimension key already exists
  dimensionExists(newKey: string): boolean {
    const dimensions = this.companyForm.get('dimensions') as FormArray;
    for (const control of dimensions.controls) {
      const keyControl = control.get('key');
      if (keyControl && keyControl.value && keyControl.value === newKey) {
        return true;
      }
    }
    return false;
  }
  

  removeDimension(index: number) {
    this.dimensions.removeAt(index);
  }
}
