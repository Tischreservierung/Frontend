import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, User } from '@auth0/auth0-angular';
import { environment } from 'src/environments/environment';
import { Auth0Client } from '@auth0/auth0-spa-js';
import { EmpRestaurant } from 'src/app/model/DTO/emp-restaurant';
import { RestaurantService } from 'src/app/service/restaurant/restaurant.service';

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
  constructor(public auth: AuthService, public router: Router,
    public restaurantService: RestaurantService) {
    this.auth.isAuthenticated$.subscribe((data: boolean) => {
      this.loggedIn = data;
      this.restaurantService.getRoles();
      if (data) {
        this.auth.user$.subscribe((user: User | null | undefined) => { if (user) this.user = user; console.log(user) });
      }

    });
  }

  logout() {
    let url = this.uri + this.router.url;
    console.log(this.router.url);
    console.log(this.uri);
    console.log(url);
    this.auth.logout({ logoutParams: { returnTo: this.uri + this.router.url } });
    this.restaurantService.employee = null;
  }

  async login() {
    this.auth.loginWithPopup().subscribe(_ => {
      this.loggedIn = true;
      this.restaurantService.getRoles();

    }
    );
    //this.auth.loginWithRedirect();
  }
}