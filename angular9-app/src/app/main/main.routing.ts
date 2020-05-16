import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { CategoryListComponent } from './categorylist/categorylist.component';
import { RemainderListComponent } from './remainderlist/remainderlist.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from '../_helpers';

export const MainRoutes: Routes = [
  {
    path: '',
     canActivate: [AuthGuard],
    children: [{
      path: '',
       canActivate: [AuthGuard],
      component: HomeComponent
    }, {
      path: 'category',
       canActivate: [AuthGuard],
      component: CategoryListComponent
    }, {
      path: 'remainders',
       canActivate: [AuthGuard],
      component: RemainderListComponent
    }
    , {
      path: 'profile',
       canActivate: [AuthGuard],
      component: ProfileComponent
    }]
  }
];
