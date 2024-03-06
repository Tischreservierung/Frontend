import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReservationComponent } from './components/restaurant/reservation/reservation.component';
import { RestaurantRegistrationComponent } from './components/restaurant/restaurant-registration/restaurant-registration.component';
import { AboutComponent } from './components/about/about.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MdbCarouselModule } from 'mdb-angular-ui-kit/carousel';
import { RestaurantFilterComponent } from './components/restaurant/restaurant-filter/restaurant-filter.component';
import { MatMenuModule } from '@angular/material/menu';
import { AuthModule } from '@auth0/auth0-angular';
import {MatTableModule} from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { RestaurantViewComponent } from './components/restaurant/restaurant-view/restaurant-view.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatStepperModule} from '@angular/material/stepper';
import { ImageCropperModule } from 'ngx-image-cropper';

import { environment } from 'src/environments/environment';
import { SearchBarComponent } from './components/restaurant/search-bar/search-bar.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthHttpInterceptor } from '@auth0/auth0-angular';
import { ReservationListComponent } from './components/reservation/reservation-list/reservation-list.component';
import { ReservationManagementComponent } from './components/reservation/reservation-management/reservation-management.component';
import { ManualReservationComponent } from './components/reservation/manual-reservation/manual-reservation.component';
import { BasicDataComponent } from './components/restaurant/restaurant-edit/basic-data/basic-data.component';
import { TablesComponent } from './components/restaurant/restaurant-edit/tables/tables.component';
import { CategoriesComponent } from './components/restaurant/restaurant-edit/categories/categories.component';
import { OpeningTimesComponent } from './components/restaurant/restaurant-edit/opening-times/opening-times.component';
import { PicturesComponent } from './components/restaurant/restaurant-edit/pictures/pictures.component';
import { SidebarComponent } from './components/restaurant/restaurant-edit/sidebar/sidebar.component';

@NgModule({
  declarations: [
    AppComponent,
    RestaurantRegistrationComponent,
    AboutComponent,
    RestaurantFilterComponent,
    RestaurantViewComponent,
    NavbarComponent,
    HomeComponent,
    ReservationComponent,
    SearchBarComponent,
    ReservationListComponent,
    ReservationManagementComponent,
    ManualReservationComponent,
    BasicDataComponent,
    TablesComponent,
    CategoriesComponent,
    OpeningTimesComponent,
    PicturesComponent,
    SidebarComponent,
  ],
  imports: [
    ImageCropperModule,
    MatChipsModule,
    MatStepperModule,
    AppRoutingModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MdbCarouselModule,
    MatMenuModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatExpansionModule,
    MatTableModule,
    AuthModule.forRoot({
      domain: environment.auth0.domain,
      clientId: environment.auth0.clientId,
      authorizationParams: {
        redirect_uri: environment.redirectUri,
        audience: 'https://localhost:7259/api/'
      },
      httpInterceptor: {
        allowedList: [environment.apiUrl+'Reservations/restaurant/*', environment.apiUrl+'Reservations*',
         environment.apiUrl+'Restaurants/employee',environment.apiUrl+'Restaurants', 
         environment.apiUrl+'Restaurants/basicdata', environment.apiUrl+'Restaurants/categoriesOfRestaurant',
        environment.apiUrl+'Restaurants/picturesOfRestaurant', environment.apiUrl+'Restaurants/tablesOfRestaurant',]
      },
    })
    , MatAutocompleteModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHttpInterceptor,
      multi: true
    },
    { provide: MAT_DATE_LOCALE, useValue: 'de' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }