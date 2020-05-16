import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginLayoutComponent, MainLayoutComponent } from './_layout';
import { AuthGuard } from './_helpers';

const routes: Routes = [
  {
  path: '',
  component: MainLayoutComponent,
  canActivate: [AuthGuard],
  data: {
  },
  children: [{
    path: '',
    canActivate: [AuthGuard],
    loadChildren:() => import('./main/main.module').then(m => m.MainModule)
  }
  ]
},

{
  path: 'session',
  component: LoginLayoutComponent,
  children: [{
    path: '',
    loadChildren: () => import('./session/session.module').then(m => m.SessionModule)
  }]
},
{
  path: '**',
  redirectTo: 'session/404'

}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
