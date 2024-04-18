import { Component,  OnInit} from '@angular/core';
import {  MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { CoreServiceService } from 'src/app/core/core-service.service';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
import { ScoreCapService } from 'src/app/services/score-cap.service';
import { AddScoreCapComponent } from '../add-score-cap/add-score-cap.component';

@Component({
  selector: 'score-cap',
  templateUrl: './score-cap.component.html',
  styleUrls: ['./score-cap.component.css'],
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
export class ScoreCapComponent implements OnInit {

  dataSource!: MatTableDataSource<any>;

  constructor(private _dialog: MatDialog,
    private _scoreCapService: ScoreCapService,
    private _coreService: CoreServiceService,
  ) { }

  ngOnInit(): void {
    this.getScoreCapList();
  }

  scoreCapForm() {
    const dialogRef = this._dialog.open(AddScoreCapComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val)
          this.getScoreCapList();
      },
    });
  }

  getScoreCapList() {
    this._scoreCapService.getAllScoreCap().subscribe({
      next: (res) => {
        console.log(res);
        this.dataSource = new MatTableDataSource(res);
      },
      error: console.log,
    });
  }

  deleteScoreCap(id: any) {
    this._scoreCapService.deleteScoreCap(id).subscribe({
      next: (res) => {
        this._coreService.openSnackBar('Score Cap Deleted!');
        this.getScoreCapList();
      },
      error: console.log,
    });
  }

  openEditScoreCapForm(data: any) {
    const dialogRef = this._dialog.open(AddScoreCapComponent, {
      data,
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getScoreCapList();
        }
      },
    });
  }
}

