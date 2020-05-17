import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { CategoryService,RemainderService,NoteService } from '../../_services';
import { Category,Remainder,Note,NoteStatus } from '../../_models'
@Component({
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {

  lstCategories: Category[] = [];
  lstRemainders: Remainder[] = [];
  lststatus: NoteStatus[] = [];
  form: FormGroup;
  add: boolean = true;
  id: number = 0;
  loading = false;
  submitted = false;
  error = '';
  note: Note;

  constructor(private fb: FormBuilder,
    private dbservice: NoteService,
    private dbcatservice: CategoryService,
    private dbremservice: RemainderService,
    public dialogRef: MatDialogRef<NoteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.add = data.add;
    this.id = data.id;
  }

  ngOnInit() {
    this.loading = false;
    this.createForm();
    this.loadData();
  }

  createForm() {

    this.form = this.fb.group({
      name: [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(50)])],
      description: [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(1500)])],
      category: [null, Validators.required],
      remainder: ['', Validators.required],
      status: [null, Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  bindData() {
    return new Promise(resolve => {
    this.dbcatservice.getAll().subscribe(cat => { 
      this.lstCategories = cat;  
      //this.loadData();    
    });
    this.dbremservice.getAll().subscribe(rem => { 
      this.lstRemainders = rem;  
      //this.loadData();    
    });

    this.dbservice.getNoteStatusAll().subscribe(rem => { 
      this.lststatus = rem;  
      //this.loadData();    
    });

    resolve(true);
  });
  }


  async loadData() {
   
    await this.bindData();
    if (!this.add) { 
      this.loading = true;
      this.dbservice.get(this.id).subscribe(cat => {
        this.loading = false;
        this.note = cat;
        this.form.patchValue({
          name: this.note.name,
          description: this.note.description,
          category: this.note.category.categoryId,
          remainder: this.note.remainder.remainderId,
          status: this.note.status.statusId
        });
      });
    }
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    let obj = new Note();
    obj.noteId = this.id;
    obj.name = this.f.name.value;
    obj.description = this.f.description.value;
    obj.categoryId = this.f.category.value;
    obj.remainderId = this.f.remainder.value;
    obj.statusId = this.f.status.value;

    if (this.add) {
      this.dbservice.create(obj)
        .subscribe(
          data => {
            this.loading = false;
            this.savesuccess(data);
          },
          error => {
            this.error = error;
            this.loading = false;
          });
    } else {
      this.dbservice.update(this.id, obj)
        .subscribe(
          data => {
            this.loading = false;
            this.savesuccess(data);
          },
          error => {
            this.error = error;
            this.loading = false;
          });
    }
  }
  savesuccess(data) {
    this.dialogRef.close(data);
  }

  close() {
    this.dialogRef.close();
  }
}
