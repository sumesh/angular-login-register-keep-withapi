import { Component, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import { CategoryComponent } from '../category/category.component';
import { CategoryService } from '../../_services';
import { Category } from 'src/app/_models';

@Component({
  templateUrl: './categorylist.component.html',
  styleUrls: ['./categorylist.component.css']
})
export class CategoryListComponent implements OnInit {
  list: Category[] = [];
  loading = false;
  error='';
  success='';
  notedialogRef: MatDialogRef<CategoryComponent> | null;

  constructor(
    public dialog: MatDialog,
    private service: CategoryService,
    private _snackBar: MatSnackBar
  ) { }

  openSnackBar(message: string,action:string="Category" ) {
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
    this.notedialogRef = this.dialog.open(CategoryComponent, {
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
