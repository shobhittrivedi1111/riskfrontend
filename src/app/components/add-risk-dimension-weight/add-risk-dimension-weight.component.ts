import { DialogRef } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreServiceService } from 'src/app/core/core-service.service';
import { AddRiskDimensionWeightService } from 'src/app/services/add-risk-dimension-weight.service';

@Component({
  selector: 'add-risk-dimension-weight',
  templateUrl: './add-risk-dimension-weight.component.html',
  styleUrls: ['./add-risk-dimension-weight.component.css']
})
export class AddRiskDimensionWeightComponent implements OnInit {
  dimensionWeightForm: FormGroup;
  constructor(private _fb: FormBuilder,
    private _formulaService: AddRiskDimensionWeightService,
    private _dialogRef: MatDialogRef<AddRiskDimensionWeightComponent>,
    private _coreService: CoreServiceService,
    @Inject(MAT_DIALOG_DATA) public data :any,
    ){
    this.dimensionWeightForm=this._fb.group({
      // dimension: '',
      // weight: '',
      dimension: ['', [Validators.required, Validators.pattern('[a-zA-Z\']+')]],
      weight:  ['',[Validators.required,]]
   
     });
  }
  ngOnInit(): void {
    this.dimensionWeightForm.patchValue(this.data);
  
  }

  onFormSubmit(){
    if(this.dimensionWeightForm.valid){
      if(this.data){
        this._dialogRef.close(this.dimensionWeightForm.value);
      }else{
      console.log(this.dimensionWeightForm.value);
      this._dialogRef.close(this.dimensionWeightForm.value);
    }
    }
  }
}
