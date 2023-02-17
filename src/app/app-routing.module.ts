import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { RestaurantRegistrationComponent } from './components/restaurant/restaurant-registration/restaurant-registration.component';
import { UserRegistrationComponent } from './components/user/user-registration/user-registration.component';

const routes: Routes = [{path:'restaurant-registration',component: RestaurantRegistrationComponent},
  {path:'about',component: AboutComponent}, 
  {path: 'userCheckIn',component: UserRegistrationComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
