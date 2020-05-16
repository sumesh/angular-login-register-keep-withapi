import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup, FormControl } from "@angular/forms";
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../../_services';
import { User } from '../../_models';

@Component({ 
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent  {
  formsignup: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  constructor(private fb: FormBuilder  
    , private router: Router
    , private authenticationService: AuthenticationService) {
     
  }


  ngOnInit() {
    this.createForm(); 
  }

  createForm() {
    this.formsignup = this.fb.group({
      name: [null,  Validators.compose([Validators.required,Validators.minLength(2)])],
      email: [null, Validators.compose([Validators.required,Validators.email])],
      username: [null, Validators.required],
      password: [null, Validators.required],
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
    obj.username=this.f.username.value;
    obj.password=this.f.password.value;
    this.authenticationService.register(obj)
     // .pipe(first())
      .subscribe(
        data => {
          console.log(data);
          this.router.navigate(['/session/login']);
        },
        error => {
          this.error = error;
          this.loading = false;
        });
  }
}
