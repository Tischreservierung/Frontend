import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { RestaurantRegistrationComponent } from './components/restaurant/restaurant-registration/restaurant-registration.component';

import { RestaurantFilterComponent } from './components/restaurant/restaurant-filter/restaurant-filter.component';
import { RestaurantViewComponent } from './components/restaurant/restaurant-view/restaurant-view.component';
import { HomeComponent } from './components/home/home.component';
import { ReservationComponent } from './components/restaurant/reservation/reservation.component';
import { ReservationListComponent } from './components/reservation/reservation-list/reservation-list.component';
import { ReservationManagementComponent } from './components/reservation/reservation-management/reservation-management.component';
import { ManualReservationComponent } from './components/reservation/manual-reservation/manual-reservation.component';
import { AuthGuard} from '@auth0/auth0-angular';
import { BasicDataComponent } from './components/restaurant/restaurant-edit/basic-data/basic-data.component';
import { TablesComponent } from './components/restaurant/restaurant-edit/tables/tables.component';
import { CategoriesComponent } from './components/restaurant/restaurant-edit/categories/categories.component';
import { OpeningTimesComponent } from './components/restaurant/restaurant-edit/opening-times/opening-times.component';
import { PicturesComponent } from './components/restaurant/restaurant-edit/pictures/pictures.component';

const routes: Routes = [
  {path: 'restaurant-registration',component: RestaurantRegistrationComponent, canActivate: [AuthGuard]},
  {path: 'about', component: AboutComponent}, 
  {path: 'restaurant-filter', component: RestaurantFilterComponent},
  {path: 'restaurantView/:id', component: RestaurantViewComponent},
  {path: 'reservationList', component: ReservationListComponent},
  {path: 'reservationManagement', component: ReservationManagementComponent},
  {path: 'reservation/:id', component: ReservationComponent},
  {path: 'addReservation', component: ManualReservationComponent},
  {path: 'reservationList', component: ReservationListComponent, canActivate: [AuthGuard]},
  {path: 'reservation/:id', component: ReservationComponent, canActivate: [AuthGuard]},
  {path: 'editbasicdata',component: BasicDataComponent},
  {path: 'edittables',component: TablesComponent},
  {path: 'editcategories',component: CategoriesComponent},
  {path: 'editopeningtimes',component: OpeningTimesComponent},
  {path: 'editpictures',component: PicturesComponent},
  {path: '', component: HomeComponent, pathMatch: "full"},
  {path: '**', component: HomeComponent, pathMatch: "full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
