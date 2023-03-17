import { Restaurant } from 'src/app/model/restaurant';
import { ZipCode } from 'src/app/model/zip-code';
import { RestaurantService } from 'src/app/service/restaurant/restaurant.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { ZipCodeService } from 'src/app/service/zip-code/zip-code.service';


@Component({
  selector: 'app-restaurant-registration',
  templateUrl: './restaurant-registration.component.html',
  styleUrls: ['./restaurant-registration.component.scss']
})
export class RestaurantRegistrationComponent {

  constructor(private resService: RestaurantService, private formBuilder: FormBuilder,
    private zipService: ZipCodeService) {
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

  formGroup: FormGroup;

  restaurants: Restaurant[] = [];

  register() {

    let temp = this.formGroup.controls;
    console.log(temp['name'].value)
    let restaurant: Restaurant;
    let zipCode: ZipCode | null = null;

    this.zipService.getZipCodeByZipCodeNrAndLocation(temp['zipCode'].value, temp['location'].value)
      .subscribe({
        next: data => {
          zipCode = data;
          console.log(zipCode);
          if (zipCode != null) {
            restaurant = {
              name: temp['name'].value, address: temp['address'].value,
              streetNr: temp['streetNr'].value, zipCode: zipCode
            };
    
            this.resService.addRestaurant(restaurant).subscribe({
              next: data => { console.log('Inserted ' + data.name) },
              error: error => { alert("Fehler" + error.message) }
            });
            this.resService.getRestaurants().subscribe({ next: data => this.restaurants = data });
          }
        },
        error: error => { alert("Fehler" + error.message) }
      });

      
  }

}
