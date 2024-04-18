import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AddCompanyFormulaComponent } from '../add-company-formula/add-company-formula.component';
import { AddCompanyFormulaService } from 'src/app/services/add-company-formula.service';
import { CoreServiceService } from 'src/app/core/core-service.service';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

@Component({
  selector: 'company-formula',
  templateUrl: './company-formula.component.html',
  styleUrls: ['./company-formula.component.css'],
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
export class CompanyFormulaComponent implements OnInit {
  dataSource!: MatTableDataSource<any>;
  constructor(private _dialog: MatDialog,
    private _formulaService: AddCompanyFormulaService,
    private _coreService: CoreServiceService
  ) { }

  ngOnInit(): void {
    this.getFormulaList();
  }

  companyFormulaForm() {
    const dialogRef = this._dialog.open(AddCompanyFormulaComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val)
          this.getFormulaList();
      },
    });
  }

  getFormulaList() {
    this._formulaService.getAllFormulas().subscribe({
      next: (res) => {
        console.log(res);
        this.dataSource = new MatTableDataSource(res);
      },
      error: console.log,
    });
  }

  deleteFormula(id: any) {
    this._formulaService.deleteFormula(id).subscribe({
      next: (res) => {
        this._coreService.openSnackBar('Formula Deleted!');
        this.getFormulaList();
      },
      error: console.log,
    });
  }

  openEditCompanyFormulaForm(data: any) {
    const dialogRef = this._dialog.open(AddCompanyFormulaComponent, {
      data,
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getFormulaList();
        }
      },
    });
  }
}
