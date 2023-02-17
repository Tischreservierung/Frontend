import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RestaurantRegistrationComponent } from './components/restaurant/restaurant-registration/restaurant-registration.component';
import { AboutComponent } from './components/about/about.component';
import { SearchRestaurantComponent } from './components/restaurant/search-restaurant/search-restaurant.component';

@NgModule({
  declarations: [
    AppComponent,
    RestaurantRegistrationComponent,
    AboutComponent,
    SearchRestaurantComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }