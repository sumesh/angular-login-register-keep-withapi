import { Component ,OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NoteComponent } from '../note/note.component';


@Component({ 
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit  {
  notes:any=[1,2,3,4,5,6,7,8,9,10];
  loading = false;

  notedialogRef: MatDialogRef<NoteComponent> | null;

  constructor( 
    public dialog: MatDialog,
   
  ) { }


  ngOnInit() {

  }

  addnotes() {
    this.notedialogRef = this.dialog.open(NoteComponent, {
      
      data: {  addnote: true,   noteid:15   }
    });

    this.notedialogRef.afterClosed().subscribe((result: any) => {
      console.log(result);
      if (result) {
         console.log(result);
      }

      this.notedialogRef = null;
    });
  }
}
