import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReservationComponent } from './components/restaurant/reservation/reservation.component';
import { RestaurantRegistrationComponent } from './components/restaurant/restaurant-registration/restaurant-registration.component';
import { AboutComponent } from './components/about/about.component';
import { UserRegistrationComponent } from './components/user/user-registration/user-registration.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MdbCarouselModule } from 'mdb-angular-ui-kit/carousel';
import { RestaurantFilterComponent } from './components/restaurant/restaurant-filter/restaurant-filter.component';
import { MatMenuModule } from '@angular/material/menu';
import { AuthModule } from '@auth0/auth0-angular';
import {MatTableModule} from '@angular/material/table';
import { MatChip, MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { RestaurantViewComponent } from './components/restaurant/restaurant-view/restaurant-view.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatStepperModule} from '@angular/material/stepper';

import { environment } from 'src/environments/environment';
import { SearchBarComponent } from './components/restaurant/search-bar/search-bar.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthHttpInterceptor } from '@auth0/auth0-angular';
import { ReservationListComponent } from './components/reservation/reservation-list/reservation-list.component';

@NgModule({
  declarations: [
    AppComponent,
    RestaurantRegistrationComponent,
    AboutComponent,
    UserRegistrationComponent,
    RestaurantFilterComponent,
    RestaurantViewComponent,
    NavbarComponent,
    HomeComponent,
    ReservationComponent,
    SearchBarComponent,
    ReservationListComponent,
  ],
  imports: [
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
      domain: 'dev-aebw48wxuxofybgz.us.auth0.com',
      clientId: 'DlhgI1ro1tfIsVp9WaSb7UkuCtx7kGnb',
      authorizationParams: {
        redirect_uri: environment.redirectUri,
        audience: 'https://localhost:7259/api/'
      },
      httpInterceptor: {
        allowedList: [`https://localhost:7259/api/*`],
      },
    })
    , MatAutocompleteModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHttpInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }