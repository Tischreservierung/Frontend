import { Restaurant } from 'src/app/model/restaurant';
import { ZipCode } from 'src/app/model/zip-code';
import { RestaurantService } from 'src/app/service/restaurant/restaurant.service';
import { Component } from '@angular/core';


@Component({
  selector: 'app-restaurant-registration',
  templateUrl: './restaurant-registration.component.html',
  styleUrls: ['./restaurant-registration.component.scss']
})
export class RestaurantRegistrationComponent {

  constructor(private service : RestaurantService){

  }

  name : string = "123";
  zipCode : string = "123";
  location : string = "132";
  address : string = "123";
  streetNr : string = "123";

  restaurants : Restaurant[] = [];

  btnRegisterClicked(){
    console.log('Register')
    let restaurant : Restaurant;
    let zipCode : ZipCode = {location: this.location, zipCodeNr: this.zipCode, district: "Test"};
    restaurant = {name: this.name,address: this.address, streetNr: this.streetNr, zipCode: zipCode};
    this.service.addRestaurant(restaurant).subscribe({
      next: data => {console.log('Inserted '+data.name)},
      error: error => { alert("Fehler" + error.message) }
    });
    this.service.getRestaurants().subscribe({next:data => this.restaurants = data});
  }

  enableRegister(){
    return !(this.name != "" && this.zipCode != "" && this.location != "" && this.streetNr != "" && this.address != "");
  }
}
