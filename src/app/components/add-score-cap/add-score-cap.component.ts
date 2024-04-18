import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreServiceService } from 'src/app/core/core-service.service';
import { AddRiskScoreLevelService } from 'src/app/services/add-risk-score-level.service';
import { ScoreCapService } from 'src/app/services/score-cap.service';

@Component({
  selector: 'app-add-score-cap',
  templateUrl: './add-score-cap.component.html',
  styleUrls: ['./add-score-cap.component.css']
})

export class AddScoreCapComponent implements OnInit {
  scoreCapForm: FormGroup;
  levels: any[] | undefined; // Array to hold the dropdown options

  constructor(
    private _fb: FormBuilder,
    private _scoreCapService: ScoreCapService,
    private _riskScoreLevelService: AddRiskScoreLevelService,
    private _dialogRef: MatDialogRef<AddScoreCapComponent>,
    private _coreService: CoreServiceService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.scoreCapForm = this._fb.group({
      conditionValue: [],
      level: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]+(?:\s[a-zA-Z0-9]+)*$/)]],
      total_risk_capped_score: ['', [Validators.required, Validators.pattern(/^[1-9]\d*$/)]],
    });
  }

  ngOnInit(): void {
   // console.log('this.data:', this.data);
    // Fetch the levels from the service and initialize the dropdown options
    this._riskScoreLevelService.getLevels().subscribe(
      (data: any) => {
        this.levels = data; // Assuming that data is an array of level objects
      },
      (error: any) => {
        console.log(error);
      }
    );
    // If the component is used for editing (data is provided),
    // patch the form with the provided data
    if (this.data) {
      this.scoreCapForm.patchValue(this.data);
    }
  }


  onFormSubmit() {
    if (this.scoreCapForm.valid) {
      const formData = {
        // id: this.data.id,
        id: this.data ? this.data.id : null,
        // id: this.scoreCapForm.get('id')?.value,
        riskScoreLevel: {
          id: this.scoreCapForm.get('riskScoreLevel.id')?.value, // Use optional chaining here
          level: this.scoreCapForm.get('level')?.value, 
        },
        conditionValue: this.scoreCapForm.get('conditionValue')?.value,
        total_risk_capped_score: this.scoreCapForm.get('total_risk_capped_score')?.value,
      };
  
      if (this.data && this.data.id) {
        // Update existing score cap
        this._scoreCapService.updateScoreCap(this.data.id, formData).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Score Cap Updated!');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.log(err);
            this._coreService.openSnackBar(err.error.errorDetails);
          },
        });
      } else {
        // Add new score cap
        console.log(formData);
        this._scoreCapService.addScoreCap(formData).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Score Cap Added Successfully!');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.log(err);
            this._coreService.openSnackBar(err.error.errorDetails);
          },
         } );
      }
    }
  }
  
}