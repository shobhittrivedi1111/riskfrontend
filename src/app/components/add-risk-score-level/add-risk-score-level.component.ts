import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreServiceService } from 'src/app/core/core-service.service';
import { AddRiskScoreLevelService } from 'src/app/services/add-risk-score-level.service';

@Component({
  selector: 'app-add-risk-score-level',
  templateUrl: './add-risk-score-level.component.html',
  styleUrls: ['./add-risk-score-level.component.css']
})
export class AddRiskScoreLevelComponent implements OnInit{
  riskScoreForm : FormGroup;
  constructor(private _fb: FormBuilder,
    private _riskScoreLevelService: AddRiskScoreLevelService,
    private _dialogRef: MatDialogRef<AddRiskScoreLevelComponent>,
    private _coreService: CoreServiceService,
    @Inject(MAT_DIALOG_DATA) public data :any,
    ){
    this.riskScoreForm=this._fb.group({
      level: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+(?:\s[a-zA-Z]+)*$/)]],
    minScore: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
    maxScore: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
    });
  }
  ngOnInit(): void {
    this.riskScoreForm.patchValue(this.data);
  }

  onFormSubmit(){
    if(this.riskScoreForm.valid){
      if(this.data){
        
        this._riskScoreLevelService.updateRiskScoreLevel(this.data.id,this.riskScoreForm.value).subscribe({
          next: (val:any)=>{
            this._coreService.openSnackBar('Risk Score Level Updated!');
            this._dialogRef.close(true);
          },
          error:(err:any)=>{
            console.log(err);
            this._coreService.openSnackBar('Cannot Change Risk Score Level Due to Score Cap Dependency!');
          },
          
        });
      }else{
      console.log(this.riskScoreForm.value);
      this._riskScoreLevelService.addRiskScoreLevel(this.riskScoreForm.value).subscribe({
        next: (val:any)=>{
          this._coreService.openSnackBar('Risk Score Level added Successfully!');
          this._dialogRef.close(true);
        },
        error:(err:any)=>{
          console.log(err);
          this._coreService.openSnackBar(err.error.errorDetails);
        },
      });
    }
    }
  }

}