import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { RestaurantRegistrationComponent } from './components/restaurant/restaurant-registration/restaurant-registration.component';

import { UserRegistrationComponent } from './components/user/user-registration/user-registration.component';
import { RestaurantFilterComponent } from './components/restaurant/restaurant-filter/restaurant-filter.component';
import { RestaurantViewComponent } from './components/restaurant/restaurant-view/restaurant-view.component';
import { HomeComponent } from './components/home/home.component';
import { ReservationComponent } from './components/restaurant/reservation/reservation.component';

const routes: Routes = [
  {path: 'restaurant-registration',component: RestaurantRegistrationComponent},
  {path: 'about', component: AboutComponent}, 
  {path: 'userCheckIn', component: UserRegistrationComponent},
  {path: 'restaurant-filter', component: RestaurantFilterComponent},
  {path: 'restaurantView/:id', component: RestaurantViewComponent},
  {path: 'reservation/:id', component: ReservationComponent},
  {path: '', component: HomeComponent, pathMatch: "full"},
  {path: '**', component: HomeComponent, pathMatch: "full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
