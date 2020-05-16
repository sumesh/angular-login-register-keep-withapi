import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';

import { SessionRoutes } from './session.routing';
import { NotFoundComponent } from './not-found/not-found.component'; 
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatDividerModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(SessionRoutes)  
  ],
  declarations: [
    NotFoundComponent,
    LoginComponent, 
    SignupComponent
  ]
})

export class SessionModule {}
