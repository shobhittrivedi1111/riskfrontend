import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CoreServiceService } from 'src/app/core/core-service.service';
import { CompanyRiskScoreService } from 'src/app/services/company-risk-score.service';

@Component({
  selector: 'app-update-company-risk-score',
  templateUrl: './update-company-risk-score.component.html',
  styleUrls: ['./update-company-risk-score.component.css']
})

// export class UpdateCompanyRiskScoreComponent implements OnInit {
//   companyName: any;
//   dimensions: { name: any; value: any; }[] = [] ;

//   constructor(
//     private companyRiskScoreService: CompanyRiskScoreService,
//     private route: ActivatedRoute,
//     private _coreService: CoreServiceService
//   ) { }

//   ngOnInit(): void {
//     this.companyName = this.route.snapshot.paramMap.get('companyName');
//     this.dimensions = [];
//     this.loadCompanyRiskScore();
//   }

//   loadCompanyRiskScore(): void {
//     if (this.companyName) {
//       this.companyRiskScoreService.getCompanyRiskScoreById(this.companyName).subscribe(
//         (data) => {
//           this.companyName = data.companyName;
//           this.dimensions = Object.entries(data.dimensions).map(([name, value]) => ({ name, value }));
//         },
//         (error) => {
//           console.error('Error fetching company risk score:', error);
//         }
//       );
//     }
//   }

//   addDimension(): void {
//     this.dimensions.push({ name: '', value: '' });
//   }

  
//   removeDimension(index: number): void {
//     this.dimensions.splice(index, 1);
//   }
  

//   saveChanges(): void {
//      // Validate dimensions
//   for (const dimension of this.dimensions) {
//     if (!/^[a-zA-Z]+$/.test(dimension.name)) {
//       console.error('Invalid dimension name:', dimension.name);
//       this._coreService.openSnackBar('Please enter Valid Dimension Key')

//       // Handle invalid dimension name (e.g., show an error message)
//       return;
//     }
//     const parsedValue = parseFloat(dimension.value);
//     // if (isNaN(parsedValue)  || parsedValue === 0 ){
//     if (isNaN(parsedValue) ){
//       console.error('Invalid dimension value:', dimension.value);
//       this._coreService.openSnackBar('Please enter Valid Dimension Value')
//       return;
//     }
//   }
//     const dimensionsObj: { [key: string]: string } = {};
  
//     for (const dimension of this.dimensions) {
//       dimensionsObj[dimension.name] = dimension.value;
//     }
  
//     const formData = {
//       companyName: this.companyName,
//       dimensions: dimensionsObj
//     };
 


//     // Call the service method to update the company risk score with the updated dimensions
//     this.companyRiskScoreService.updateCompanyRiskScore(this.companyName, formData).subscribe(
//       (response) => {
//         console.log('Dimensions updated successfully:', response);
//         this._coreService.openSnackBar('Dimensions updated successfully');

//         // Handle success
//       },
//       (error) => {
//         console.error('Error updating dimensions:', error);
//         this._coreService.openSnackBar(error.error.errorDetails);

//         // Handle error
//       }
//     );
//   }
// }


export class UpdateCompanyRiskScoreComponent implements OnInit {
  companyName: any;
  dimensions: { name: any; value: any; }[] = [] ;

  constructor(
    private companyRiskScoreService: CompanyRiskScoreService,
    private route: ActivatedRoute,
    private _coreService: CoreServiceService
  ) { }

  ngOnInit(): void {
    this.companyName = this.route.snapshot.paramMap.get('companyName');
    this.dimensions = [];
    this.loadCompanyRiskScore();
  }

  loadCompanyRiskScore(): void {
    if (this.companyName) {
      this.companyRiskScoreService.getCompanyRiskScoreById(this.companyName).subscribe(
        (data) => {
          this.companyName = data.companyName;
          this.dimensions = Object.entries(data.dimensions).map(([name, value]) => ({ name, value }));
        },
        (error) => {
          console.error('Error fetching company risk score:', error);
        }
      );
    }
  }

  addDimension(): void {
    this.dimensions.push({ name: '', value: '' });
  }

  removeDimension(index: number): void {
    this.dimensions.splice(index, 1);
  }

  async saveChanges(): Promise<void> {
    // Validate dimensions
    for (const dimension of this.dimensions) {
      if (!/^[a-zA-Z]+$/.test(dimension.name)) {
        console.error('Invalid dimension name:', dimension.name);
        this._coreService.openSnackBar('Please enter Valid Dimension Key');
        return;
      }
      const parsedValue = parseFloat(dimension.value);
      if (isNaN(parsedValue)) {
        console.error('Invalid dimension value:', dimension.value);
        this._coreService.openSnackBar('Please enter Valid Dimension Value');
        return;
      }
      if (this.dimensions.filter(d => d.name === dimension.name).length > 1) {
        console.error('Duplicate dimension key:', dimension.name);
        this._coreService.openSnackBar('Duplicate Dimension Key: ' + dimension.name);
        return;
      }
    }

    const dimensionsObj: { [key: string]: string } = {};
    for (const dimension of this.dimensions) {
      dimensionsObj[dimension.name] = dimension.value;
    }

    const formData = {
      companyName: this.companyName,
      dimensions: dimensionsObj
    };

    // try {
    //   const response = await this.companyRiskScoreService.updateCompanyRiskScore(this.companyName, formData).toPromise();
    //   console.log('Dimensions updated successfully:', response);
    //   this._coreService.openSnackBar('Dimensions updated successfully');
    // } catch (error) {
    //   console.error('Error updating dimensions:', error);
    //   this._coreService.openSnackBar(error.errorDetails);
    // }
    try {
      const response = await this.companyRiskScoreService.updateCompanyRiskScore(this.companyName, formData).toPromise();
      console.log('Dimensions updated successfully:', response);
      this._coreService.openSnackBar('Dimensions updated successfully');
    } catch (error) {
      console.error('Error updating dimensions:', error);
          //   this._coreService.openSnackBar(error.errorDetails);

     this._coreService.openSnackBar('Error updating dimensions: ' + (error as any).error?.errorDetails || 'Unknown error occurred');
    }
  }
}
