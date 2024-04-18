import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { CoreServiceService } from 'src/app/core/core-service.service';
import { AddRiskScoreLevelService } from 'src/app/services/add-risk-score-level.service';
import { AddRiskScoreLevelComponent } from '../add-risk-score-level/add-risk-score-level.component';

@Component({
  selector: 'risk-score-level',
  templateUrl: './risk-score-level.component.html',
  styleUrls: ['./risk-score-level.component.css'],
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
export class RiskScoreLevelComponent implements OnInit {

  dataSource!: MatTableDataSource<any>;


  constructor(private _dialog: MatDialog,
    private _riskScoreLevelService: AddRiskScoreLevelService,
    private _coreService: CoreServiceService
  ) { }

  ngOnInit(): void {
    this.getRiskScoreLevelList();
  }

  riskScoreLevelForm() {
    const dialogRef = this._dialog.open(AddRiskScoreLevelComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val)
          this.getRiskScoreLevelList();
      },
    });
  }

  getRiskScoreLevelList() {
    this._riskScoreLevelService.getAllRiskScoreLevel().subscribe({
      next: (res) => {
        console.log(res);
        this.dataSource = new MatTableDataSource(res);
      },
      error: console.log,
    });
  }

  deleteRiskScoreLevel(id: any) {
    this._riskScoreLevelService.deleteRiskScoreLevel(id).subscribe({
      next: (res) => {
        this._coreService.openSnackBar('Risk Score Level Deleted!');
        this.getRiskScoreLevelList();
      },
      error:(err:any)=>{
        this._coreService.openSnackBar('Score Cap is dependent on this Risk Score Level!');
      },
    });
  }

  openEditRiskScoreLevelForm(data: any) {
    const dialogRef = this._dialog.open(AddRiskScoreLevelComponent, {
      data,
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getRiskScoreLevelList();
        }
      },
    });
  }
}

