import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from "@angular/forms";
import { User } from '../../_models';
import { UserService,AuthenticationService } from '../../_services';

@Component({
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  formsignup: FormGroup;
  loading = false;
  submitted = false;
  
  error = '';
  edit = false;
  users: User;

  constructor(private fb: FormBuilder  ,
    private userService: UserService
    ) {

  }
  ngOnInit() {
    this.loading = true;
    this.createForm();  
    this.loadData();
  }

  createForm() {
    this.formsignup = this.fb.group({
      name: [null, Validators.compose([Validators.required,Validators.minLength(2)])],
      email: [null, Validators.compose([Validators.required,Validators.email])]       
    });
  }

  loadData()
  {
    this.userService.getUser().subscribe(users => {
      this.loading = false; 
      this.users = users;
      this.formsignup.patchValue({
        name:this.users.name,
        email:this.users.emailId
      });
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.formsignup.controls; }

  onSubmit() { 
    this.submitted = true; 
    // stop here if form is invalid
    if (this.formsignup.invalid) {
      return;
    }

    this.loading = true;
    let obj=new User();
    obj.name=this.f.name.value;
    obj.emailId=this.f.email.value; 
    this.userService.updateuser(obj)
     // .pipe(first())
      .subscribe(
        data => { 
          this.loading = false;
          this.edit = false;
          this.loadData();
        },
        error => {
          this.error = error;
          this.loading = false;
        });
  }

  editprofile() { 
    this.edit = true;
  }
  canceledit()
  {
    this.edit = false;
    this.loading = false;
  }
}
