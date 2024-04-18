import { Component, OnInit} from '@angular/core';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
import { CompanyRiskScoreService } from 'src/app/services/company-risk-score.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { CoreServiceService } from 'src/app/core/core-service.service';
import { Router } from '@angular/router';
import { OutputService } from 'src/app/services/output.service';

@Component({
  selector: 'company-risk-score',
  templateUrl: './company-risk-score.component.html',
  styleUrls: ['./company-risk-score.component.css'],
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
export class CompanyRiskScoreComponent implements OnInit {
  ngOnInit(): void {
   this.getCompanyRiskScoreList();
  }

  dataSource!: MatTableDataSource<any>;
  displayedColumns: any = {
    companyName: '',
    dimensions: {}
  };

    constructor(private _dialog: MatDialog,
    private _companyRiskScoreService: CompanyRiskScoreService,
    private _outPutDeleteService: OutputService,
    private _coreService: CoreServiceService,
    private _router: Router,
  ) { }

  companyRiskScoreForm() {

    this._router.navigate (['add-company-risk-score']);
  }

  getCompanyRiskScoreList() {
    this._companyRiskScoreService.getAllCompanyRiskScore().subscribe({
      next: (res:any) => {
        console.log(res);
        this.dataSource = new MatTableDataSource(res);
      },
      error: console.log,
    });
  }

  deleteCompanyRiskScore(companyName: String) {
    this._companyRiskScoreService.deleteCompanyRiskScore(companyName).subscribe({
      next: (res) => {
        this._coreService.openSnackBar('Company & Dimension Deleted!');
        this.deleteOutputForCompany(companyName);
        this.getCompanyRiskScoreList();
      },
      error: console.log,
    });
  }
  deleteOutputForCompany(companyName: String) {
    this._outPutDeleteService.deleteOutputByCompanyName(companyName).subscribe({
      next: (res) => {
        console.log('Output deleted successfully.');
      },
      error: console.log,
    });
  }
  

  openEditCompanyRiskScoreForm(row: any) {
    console.log(row);
    this._router.navigate(['update-company-risk-score',row]);
  }
}
