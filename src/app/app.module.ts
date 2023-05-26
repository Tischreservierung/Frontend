import { NgModule} from '@angular/core';
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
import {MatMenuModule} from '@angular/material/menu';
import { DeviceDetectorService } from 'ngx-device-detector';
import { AuthModule } from '@auth0/auth0-angular';
import {MatSelectModule} from '@angular/material/select';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { RestaurantViewComponent } from './components/restaurant/restaurant-view/restaurant-view.component';

@NgModule({
  declarations: [
    AppComponent,
    RestaurantRegistrationComponent,
    AboutComponent,
    UserRegistrationComponent,
    RestaurantFilterComponent,
    RestaurantViewComponent,
  ],
  imports: [
    BrowserModule,
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

    AuthModule.forRoot({
      domain: 'dev-6zf41u66fsy2t2gr.us.auth0.com', 
      clientId: 'iPF1i40nz4bEVBHVXEj7OhAEeTd6V37w',
      authorizationParams: {
      redirect_uri: window.location.origin
    }})
    ,MatAutocompleteModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }