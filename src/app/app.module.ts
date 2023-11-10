import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RestaurantRegistrationComponent } from './components/restaurant/restaurant-registration/restaurant-registration.component';
import { AboutComponent } from './components/about/about.component';
import { UserRegistrationComponent } from './components/user/user-registration/user-registration.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MdbCarouselModule } from 'mdb-angular-ui-kit/carousel';
import { RestaurantFilterComponent } from './components/restaurant/restaurant-filter/restaurant-filter.component';
import { MatMenuModule } from '@angular/material/menu';
import { AuthModule } from '@auth0/auth0-angular';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { RestaurantViewComponent } from './components/restaurant/restaurant-view/restaurant-view.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatStepperModule} from '@angular/material/stepper';
import { ImageCropperModule, base64ToFile } from 'ngx-image-cropper';

import { environment } from 'src/environments/environment';

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
  ],
  imports: [
    BrowserModule,
    MatStepperModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
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
    ImageCropperModule,

    AuthModule.forRoot({
      domain: 'dev-tischreservierung.eu.auth0.com',
      clientId: 'RpHUpcad4hQJxBwQhDeMeHMuRbFoQtMf',
      authorizationParams: {
        redirect_uri: environment.redirectUri,
      }
    })
    , MatAutocompleteModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }