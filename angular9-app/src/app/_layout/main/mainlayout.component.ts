import { Component,Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService,UserService } from '../../_services';
import { User } from '../../_models';
 
@Component({ 
  templateUrl: './mainlayout.component.html',
  styleUrls: ['./mainlayout.component.css']
})

@Injectable({ providedIn: 'root'})
export class MainLayoutComponent  {
  currentUser: User;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService
) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    this.userService.currentUser.subscribe(x => this.currentUser.name = x.name);
}

logout() {
    this.authenticationService.logout(); 
    this.router.navigate(['/session/login']);
}
}
