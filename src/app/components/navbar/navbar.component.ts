import { Component } from '@angular/core';
import { AuthService, User} from '@auth0/auth0-angular';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  loggedIn: boolean = false;
  user: User | null = null;
  uri = environment.redirectUri;
  constructor(public auth: AuthService){
    this.auth.isAuthenticated$.subscribe(data => 
      {this.loggedIn = data});
    this.auth.user$.subscribe(data => {if (data) this.user = data});
  }

  logout(){
    this.auth.logout({logoutParams: {returnTo: this.uri}});
  }

  login(){
    this.auth.loginWithRedirect();
  }
}