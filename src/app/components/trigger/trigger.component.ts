import { Component, Inject, OnInit,ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { CoreServiceService } from 'src/app/core/core-service.service';
import { TriggerService } from 'src/app/services/trigger.service';

@Component({
  selector: 'trigger',
  templateUrl: './trigger.component.html',
  styleUrls: ['./trigger.component.css']
})
export class TriggerComponent  implements OnInit {

  displayedColumns: string[] = ['id', 'timeStamp', 'failedCompanies','status','jobStatusName'];

  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _dialog:MatDialog,
     private _triggerService: TriggerService,
     private _coreService: CoreServiceService
     ){}
  ngOnInit(): void {
    this.getJobExecution();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  getJobExecution(){
    this._triggerService.getJobExecutionStatus().subscribe({
      next:(res)=>{
        console.log(res);
     this.dataSource=new MatTableDataSource(res);
     this.dataSource.sort=this.sort;
     this.dataSource.paginator=this.paginator;
      },
      error: console.log,
    });
  }

}