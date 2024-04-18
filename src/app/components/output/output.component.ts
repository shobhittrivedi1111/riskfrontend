import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { OutputService } from 'src/app/services/output.service';
import { CoreServiceService } from 'src/app/core/core-service.service';

@Component({
  selector: 'app-output',
  templateUrl: './output.component.html',
  styleUrls: ['./output.component.css'],
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
export class OutputComponent implements OnInit {
  ngOnInit(): void {
    this.getOutputList();
   }
 
   dataSource!: MatTableDataSource<any>;
   displayedColumns: any = {
     companyName: '',
     formulaOutput: {}
   };
 
     constructor(private _dialog: MatDialog,
     private _outputService: OutputService,
     private _coreService: CoreServiceService
   ) { }
 
   getOutputList() {
     this._outputService.getAllOutput().subscribe({
       next: (res:any) => {
         console.log(res);
         this.dataSource = new MatTableDataSource(res);
       },
       error: console.log,
     });
   }
 

}
