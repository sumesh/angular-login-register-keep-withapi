import { Component ,OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NoteComponent } from '../note/note.component';
import {MatSnackBar} from '@angular/material/snack-bar'; 
import { NoteService } from '../../_services';
import { Note } from '../../_models';

@Component({ 
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit  {
  list: Note[] = [];
  rows: Note[] = [];
  loading = false;
  error='';
  success='';
  notedialogRef: MatDialogRef<NoteComponent> | null;

  constructor(
    public dialog: MatDialog,
    private service: NoteService,
    private _snackBar: MatSnackBar
  ) { }

  openSnackBar(message: string,action:string="Note" ) {
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
       this.rows=[...this.list];
      console.log(this.list);
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
    this.notedialogRef = this.dialog.open(NoteComponent, {
      data: { add: id > 0 ? false : true, id: id }
    });

    this.notedialogRef.afterClosed().subscribe((result: any) => {
      if (result) { 
        this.loadData();
      }

      this.notedialogRef = null;
    });
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    // filter our data
    const temp = this.list.filter(function (d) {
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });
    // update the rows
    this.rows = temp; 
  }
}
