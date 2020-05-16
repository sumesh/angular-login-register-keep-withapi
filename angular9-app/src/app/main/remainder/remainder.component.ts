 
import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import {  RemainderService } from '../../_services';
import { Remainder } from '../../_models'
 
@Component({ 
  templateUrl: './remainder.component.html',
  styleUrls: ['./remainder.component.css'] 
})
export class RemainderComponent  {
  form: FormGroup;
  add: boolean = true;
  id: number = 0;
  loading = false;
  submitted = false;
  error = '';
  remainder: Remainder;

  constructor(private fb: FormBuilder,
    private dbservice: RemainderService,
    public dialogRef: MatDialogRef<RemainderComponent>,
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
      name: [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(500)])],
      description: [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(1000)])]
    });
  }

  loadData() {
    if (!this.add) {
      this.loading = true;
      this.dbservice.get(this.id).subscribe(cat => {
        this.loading = false;
        this.remainder = cat;
        this.form.patchValue({
          name: this.remainder.name,
          description: this.remainder.description
        });
      });
    }
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    let obj = new Remainder();
    obj.remainderId = this.id;
    obj.name = this.f.name.value;
    obj.description = this.f.description.value;
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
