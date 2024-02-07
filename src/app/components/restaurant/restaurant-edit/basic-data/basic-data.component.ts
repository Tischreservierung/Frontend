import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { BasicRestaurant } from 'src/app/model/DTO/basic-restaurant.model';
import { ZipCode } from 'src/app/model/zip-code';
import { RestaurantService } from 'src/app/service/restaurant/restaurant.service';
import { ZipCodeService } from 'src/app/service/zip-code/zip-code.service';

@Component({
  selector: 'app-basic-data',
  templateUrl: './basic-data.component.html',
  styleUrls: ['./basic-data.component.scss']
})
export class BasicDataComponent implements OnInit {
  basicDataForm: FormGroup = new FormGroup({
    'id': new FormControl(0),
    'name': new FormControl('', [Validators.required, Validators.minLength(2)]),
    'description': new FormControl('', [Validators.maxLength(2000)]),
    'address': new FormControl('', [Validators.required]),
    'streetNr': new FormControl('', [Validators.required]),
    'zipCode': new FormControl('')
  });

  oldRestaurant: BasicRestaurant | null = null;

  location: ZipCode = { id: 0, zipCodeNr: "", location: "", district: ""};
  locations: ZipCode[] = [];
  filteredLocations: Observable<ZipCode[]> = new Observable<ZipCode[]>();

  constructor(private restaurantService: RestaurantService, private zipService: ZipCodeService) { }
  ngOnInit(): void {
    this.restaurantService.getBasicDataRestaurant().subscribe({
      next: (restaurant) => {
        this.oldRestaurant = restaurant;
        this.setBasicForm(restaurant);
      }
    });

    this.zipService.getZipCodes().subscribe({
      next: data => {
        this.locations = data;
        this.filteredLocations = this.basicDataForm.controls['zipCode'].valueChanges.pipe(
          startWith(''),
          map(loc => (loc ? this._filterLocations(loc) : this.locations.slice()))
        );
      }
    });
  }

  setBasicForm(restaurant: BasicRestaurant) {
    this.location = restaurant.zipCode;
    this.basicDataForm.patchValue({
      id: restaurant.id,
      name: restaurant.name,
      description: restaurant.description,
      address: restaurant.address,
      streetNr: restaurant.streetNr,
      zipCode: restaurant.zipCode.location + " | " + restaurant.zipCode.zipCodeNr
    });
  }

  private _filterLocations(value: string): ZipCode[] {
    const filterValue = value.toLowerCase();
    return this.locations.filter(loc => {
      let l = loc.location + " | " + loc.zipCodeNr;
      return l.toLowerCase().includes(filterValue)
    });
  }

  save() {
    console.log(this.basicDataForm.value);
    let restaurant : BasicRestaurant = this.basicDataForm.value;
    restaurant.zipCode = this.location;
    console.log(restaurant)
    this.restaurantService.updateRestaurant(restaurant).subscribe({next: (data) => this.oldRestaurant = restaurant, 
    error: (err) => alert(err)});
  }

  cancel() {
    if (this.oldRestaurant != null)
      this.setBasicForm(this.oldRestaurant);
  }

}
