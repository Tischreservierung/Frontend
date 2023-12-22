import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, User} from '@auth0/auth0-angular';
import { environment } from 'src/environments/environment';
import { Auth0Client} from '@auth0/auth0-spa-js';

const auth0 = new Auth0Client({
  domain: 'dev-aebw48wxuxofybgz.us.auth0.com',
  clientId: 'DlhgI1ro1tfIsVp9WaSb7UkuCtx7kGnb'
});

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
    this.auth.isAuthenticated$.subscribe((data:boolean) => 
      {this.loggedIn = data});
    this.auth.user$.subscribe((data :User|null|undefined) => {if (data) this.user = data});

    
  }

  logout(){
    let url = this.uri + this.router.url;
    console.log(this.router.url);
    console.log(this.uri);
    console.log(url);
    this.auth.logout({logoutParams: {returnTo: this.uri + this.router.url}});
  }

  async login(){
    /*await auth0.loginWithPopup({authorizationParams: {
      redirect_uri: 'http://localhost:4200/'
    }});
    const user = await auth0.getUser();
    console.log(user);
    if(user){ 
      this.loggedIn = true;
      this.user = user;
    }
    const accessToken = await auth0.getTokenSilently({authorizationParams: {
      audience: 'https://Reservio',
      scope: 'read:rules'
    }});
    console.log(accessToken);*/

    this.auth.loginWithPopup().subscribe(_ => this.auth.getAccessTokenSilently()
              .subscribe((data: string) => {console.log(data);}));
    //this.auth.loginWithRedirect();
  }
}