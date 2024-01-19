import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, User} from '@auth0/auth0-angular';
import { environment } from 'src/environments/environment';
import { Auth0Client} from '@auth0/auth0-spa-js';
import { UserService } from 'src/app/service/user/user.service';
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
  employee : EmpRestaurant | null = null;
  constructor(public auth: AuthService,public router : Router, public userService : UserService,
     public restaurantService : RestaurantService){
    this.auth.isAuthenticated$.subscribe((data:boolean) => {
      this.loggedIn = data; 
      if(data){
        this.auth.user$.subscribe((user :User|null|undefined) => {if (user) this.user = user; console.log(user)});
        this.restaurantService.getRoles().subscribe((emp : EmpRestaurant| null) => this.employee = emp);
      }
      
    });
  }

  logout(){
    let url = this.uri + this.router.url;
    console.log(this.router.url);
    console.log(this.uri);
    console.log(url);
    this.auth.logout({logoutParams: {returnTo: this.uri + this.router.url}});
    this.employee = null;
  }

  async login(){
    this.auth.loginWithPopup().subscribe(_ => this.auth.user$.subscribe((data :User|null|undefined) => console.log(data)));
    //this.auth.loginWithRedirect();
  }
}