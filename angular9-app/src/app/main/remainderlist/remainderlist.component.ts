import { Component, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import { RemainderComponent } from '../remainder/remainder.component';
import { RemainderService } from '../../_services';
import { Remainder } from 'src/app/_models';

@Component({
  templateUrl: './remainderlist.component.html',
  styleUrls: ['./remainderlist.component.css']
})
export class RemainderListComponent implements OnInit {
  list: Remainder[] = [];
  loading = false;
  error='';
  success='';
  notedialogRef: MatDialogRef<RemainderComponent> | null;

  constructor(
    public dialog: MatDialog,
    private service: RemainderService,
    private _snackBar: MatSnackBar
  ) { }

  openSnackBar(message: string,action:string="Remainder" ) {
    this._snackBar.open(message,action, {
      duration: 2000,
    });
  }
  ngOnInit() {
    this.loadData();
  }

  loadData() { 
   
    this.loading = true;
    this.service.getAll().subscribe(lst => {
      this.loading = false;
      this.list = lst;
    },error => {  
      this.openSnackBar("Data not loaded.Please try again");
      this.loading = false;
    });
  }

  delete(id: number) { 
    if (confirm("Please confirm")) {
      this.loading = true;
      this.service.delete(id).subscribe(lst => {
        this.loading = false;
        this.openSnackBar("Deleted");
        this.loadData(); 
      }, error => { 
        this.openSnackBar( "Not Deleted");
        this.loading = false;
      });
    }
  }

  addnotes(id: number) {
    this.notedialogRef = this.dialog.open(RemainderComponent, {
      data: { add: id > 0 ? false : true, id: id }
    });

    this.notedialogRef.afterClosed().subscribe((result: any) => {
      if (result) { 
        this.loadData();
      }

      this.notedialogRef = null;
    });
  }
}
