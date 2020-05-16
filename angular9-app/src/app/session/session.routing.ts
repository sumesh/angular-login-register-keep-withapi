import { Routes } from '@angular/router';

import { NotFoundComponent } from './not-found/not-found.component'; 
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

export const SessionRoutes: Routes = [
  {
    path: '',
    children: [{
      path: '404',
      component: NotFoundComponent
    } , {
      path: 'login',
      component: LoginComponent
    }, {
      path: 'signup',
      component: SignupComponent
    }]
  }
];
