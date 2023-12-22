import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { RestaurantRegistrationComponent } from './components/restaurant/restaurant-registration/restaurant-registration.component';

import { UserRegistrationComponent } from './components/user/user-registration/user-registration.component';
import { RestaurantFilterComponent } from './components/restaurant/restaurant-filter/restaurant-filter.component';
import { RestaurantViewComponent } from './components/restaurant/restaurant-view/restaurant-view.component';
import { HomeComponent } from './components/home/home.component';
import { ReservationComponent } from './components/restaurant/reservation/reservation.component';
import { ReservationListComponent } from './components/reservation/reservation-list/reservation-list.component';
import { AuthGuard} from '@auth0/auth0-angular';

const routes: Routes = [
  {path: 'restaurant-registration',component: RestaurantRegistrationComponent, canActivate: [AuthGuard]},
  {path: 'about', component: AboutComponent}, 
  {path: 'userCheckIn', component: UserRegistrationComponent},
  {path: 'restaurant-filter', component: RestaurantFilterComponent},
  {path: 'restaurantView/:id', component: RestaurantViewComponent},
  {path: 'reservationList', component: ReservationListComponent, canActivate: [AuthGuard]},
  {path: 'reservation/:id', component: ReservationComponent, canActivate: [AuthGuard]},
  {path: '', component: HomeComponent, pathMatch: "full"},
  {path: '**', component: HomeComponent, pathMatch: "full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
