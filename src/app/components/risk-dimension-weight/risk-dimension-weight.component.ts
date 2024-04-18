import { Component, OnInit,} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { CoreServiceService } from 'src/app/core/core-service.service';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
import { AddRiskDimensionWeightService } from 'src/app/services/add-risk-dimension-weight.service';
import { AddRiskDimensionWeightComponent } from '../add-risk-dimension-weight/add-risk-dimension-weight.component';

@Component({
  selector: 'risk-dimension-weight',
  templateUrl: './risk-dimension-weight.component.html',
  styleUrls: ['./risk-dimension-weight.component.css'],
  animations: [
    trigger('cardAnimation', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(-50px)' }),
          stagger('100ms', [
            animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
          ]),
        ], { optional: true })
      ])
    ])
  ]
})
export class RiskDimensionWeightComponent implements OnInit {
 dataSource!: MatTableDataSource<any>;
//  dataSource!: any
  constructor(private _dialog: MatDialog,
    private _weightService: AddRiskDimensionWeightService,
    private _coreService: CoreServiceService
  ) { }

  ngOnInit(): void {
    this.getFormulaList();
  }
  parseAndRoundWeight(weight: number): string {
    return (parseFloat(weight.toString()) * 100).toFixed(0);
  }

  companyFormulaForm() {
    const dialogRef = this._dialog.open(AddRiskDimensionWeightComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
    
    // Check if the object already exists in the data source
    const isDuplicate = this.dataSource.data.some(item => item.dimension === val.dimension);
    if (!isDuplicate) {
      // Divide the weight by 100
      val.weight /= 100;
      // Add the new object to the data source
      this.dataSource.data.push(val);
      // Notify the MatTableDataSource that the data has changed
      this.dataSource._updateChangeSubscription(); // Use with caution or use the alternative method 
}
      },
    });
  }

  getFormulaList() {
    this._weightService.getAllDimensionWeight().subscribe({
      next: (res:any) => {
        console.log(res);
     this.dataSource = new MatTableDataSource(res);
     
      // this.dataSource = res
      },
      error: console.log,
      complete: () => {
        // Calculate and print the sum of weights
       console.log(this.calculateWeightSum());
      },
    });
  }
    // Function to calculate the sum of all weights in the MatTableDataSource
    calculateWeightSum(): number {
      return this.dataSource?.data.reduce((sum, item) => sum + item.weight*100, 0);
    }

  deleteFormula(dimension: String) {
    // Assuming you have a dimension property in your data objects
const dimensionToDelete = dimension
const indexToDelete = this.dataSource.data.findIndex((item) => item.dimension === dimensionToDelete);
if (indexToDelete > -1) {
  this.dataSource.data.splice(indexToDelete, 1);
}
// After removing the item from the data array
this.dataSource.data = this.dataSource.data.filter((item) => item.dimension !== dimensionToDelete);
  }

  openEditCompanyFormulaForm(data: any) {
    const dialogRef = this._dialog.open(AddRiskDimensionWeightComponent, {
      data,
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        console.log(val)
        // Function to update the data
  const updatedData = this.dataSource.data.map(item => {
    if (item.dimension === val.dimension) {
      return { ...item, weight: val.weight/100 };
    } else {
      return item;
    }
  });
  // Update the data source with the new data array
  this.dataSource.data = updatedData;
      },
    });
  }
submitData() {
  // Multiply the weight by 100 for each item in the data source
  const dataWithMultipliedWeight = this.dataSource.filteredData.map(item => ({
    ...item,
    weight: item.weight * 100
  }));

  console.log(dataWithMultipliedWeight);

  this._weightService.addOrUpdateDimensionWeight(dataWithMultipliedWeight).subscribe({
    next: (res) => {
      this._coreService.openSnackBar('Dimension Updated!');
    },
    error: (err: any) => {
      this._coreService.openSnackBar(err.error.errorDetails);
      this.ngOnInit();
    },
    complete: () => {
      this.getFormulaList();
      this.ngOnInit();
    }
  });
}
}