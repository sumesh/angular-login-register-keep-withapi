import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
@Component({
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {
  noteform: FormGroup;
  lstCategories: any = [ 
  { ID: '1', Value: 'C 1' },
  { ID: '2', Value: 'C 2' },
  { ID: '3', Value: 'C 3' } ];
  lstremainders: any = [
    { ID: '1', Value: 'R 1' },
    { ID: '2', Value: 'R 2' },
    { ID: '3', Value: 'R 3' } 
  ];
  lststatus: any = [
    { ID: '1', Value: 'RS 1' },
    { ID: '2', Value: 'RS 2' },
    { ID: '3', Value: 'RS 3' } 
  ];
  addnote: boolean = true;
  noteid:number=0;
  constructor(private fb: FormBuilder,
    public dialogRef: MatDialogRef<NoteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.addnote=data.addnote;
      this.noteid=data.noteid;

  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    console.log('Form Create');
    this.noteform = this.fb.group({
      notetitle: [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(50)])],
        note: [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(200)])],
      category: [null, Validators.required],
      noteremainder: ['',  Validators.required],
       notestatus: [null,  Validators.required]
    });
  }

  close() {
    this.dialogRef.close();
  }

  savenote() {
    this.noteform.updateValueAndValidity();
    console.log(this.noteform.value);
    let data={};
    data['ID'] = 1;
    data['title'] = 'Note 1';
    this.dialogRef.close(data);
  }
}
