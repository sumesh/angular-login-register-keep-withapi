import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup, FormControl } from "@angular/forms";
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../../_services';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  formlogin: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  constructor(private fb: FormBuilder
    , private router: Router
    , private route: ActivatedRoute
    , private authenticationService: AuthenticationService) {
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }


  ngOnInit() {
    this.createForm();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  createForm() {
    this.formlogin = this.fb.group({
      username: [null, Validators.required],
      password: [null, Validators.required],
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.formlogin.controls; }

  onSubmit() {
    
    this.submitted = true;

    // stop here if form is invalid
    if (this.formlogin.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService.login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.error = error;
          this.loading = false;
        });
  }
}
