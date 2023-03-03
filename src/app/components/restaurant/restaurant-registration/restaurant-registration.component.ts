import { Restaurant } from 'src/app/model/restaurant';
import { ZipCode } from 'src/app/model/zip-code';
import { RestaurantService } from 'src/app/service/restaurant/restaurant.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-restaurant-registration',
  templateUrl: './restaurant-registration.component.html',
  styleUrls: ['./restaurant-registration.component.scss']
})
export class RestaurantRegistrationComponent {

  constructor(private service: RestaurantService, private formBuilder : FormBuilder) {
    this.formGroup = this.createForm();
  }

  createForm() {
    return this.formBuilder.group({
      'name': [null],
      'zipCode': [null],
      'location': [null],
      'address': [null],
      'streetNr': [null]
    });
  }

  formGroup : FormGroup;

  restaurants: Restaurant[] = [];

  register() {
    
    let temp = this.formGroup.controls;
    console.log(temp['name'].value)
    let restaurant: Restaurant;
    let zipCode: ZipCode = { location: temp['location'].value, zipCodeNr: temp['zipCode'].value, district: "Linz-Land" };
    restaurant = { name: temp['name'].value, address: temp['address'].value,
     streetNr: temp['streetNr'].value, zipCode: zipCode };
    this.service.addRestaurant(restaurant).subscribe({
      next: data => { console.log('Inserted ' + data.name) },
      error: error => { alert("Fehler" + error.message) }
    });
    this.service.getRestaurants().subscribe({ next: data => this.restaurants = data });
  }

}
