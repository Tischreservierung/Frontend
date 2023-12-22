import { Component } from '@angular/core';
import { Router } from '@angular/router';
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
  constructor(public auth: AuthService,public router : Router){
    this.auth.isAuthenticated$.subscribe(data => 
      {this.loggedIn = data});
    this.auth.user$.subscribe(data => {if (data) this.user = data});
  }

  logout(){
    let url = this.uri + this.router.url;
    console.log(this.router.url);
    console.log(this.uri);
    console.log(url);
    this.auth.logout({logoutParams: {returnTo: this.uri + this.router.url}});
  }

  login(){
    this.auth.loginWithPopup();
    //this.auth.loginWithRedirect();
  }
}