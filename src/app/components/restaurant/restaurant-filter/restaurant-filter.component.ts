import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DeviceDetectorService, DeviceInfo } from 'ngx-device-detector';
import { Observable, map, startWith } from 'rxjs';
import { Category } from 'src/app/model/category';
import { ZipCode } from 'src/app/model/zip-code';
import { CategoryService } from 'src/app/service/category/category.service';
import { RestaurantService } from 'src/app/service/restaurant/restaurant.service';
import { ZipCodeService } from 'src/app/service/zip-code/zip-code.service';

@Component({
  selector: 'app-restaurant-filter',
  templateUrl: './restaurant-filter.component.html',
  styleUrls: ['./restaurant-filter.component.scss']
})
export class RestaurantFilterComponent implements OnInit {
  deviceInfo: DeviceInfo;
  showMobile: boolean = false;

  categories: Category[] = [];
  locations: ZipCode[] = [];
  filteredLocations: Observable<ZipCode[]> = new Observable<ZipCode[]>();

  categoryControl = new FormControl<Category[] | null>(null);
  locationControl = new FormControl<string>('');
  nameControl = new FormControl<string>('');
  dateControl = new FormControl<Date |null>(null);
  timeControl = new FormControl<Time | null>(null);
  location: ZipCode | null = null;


  constructor(private deviceService: DeviceDetectorService, private catService: CategoryService,
    private zipCodeService: ZipCodeService, private restaurantService: RestaurantService) {
    this.deviceInfo = this.deviceService.getDeviceInfo();

  }
  ngOnInit(): void {
    this.catService.getCategories().subscribe({
      next: data => { this.categories = data }
    });
    this.zipCodeService.getZipCodes().subscribe({
      next: data => {
        this.locations = data; 
        this.filteredLocations = this.locationControl.valueChanges.pipe(
          startWith(''),
          map(loc => (loc ? this._filterLocations(loc) : this.locations.slice()))
        );
      }
    });
    this.epicFunction();
  }

  filter(){
    if(this.nameControl.value != '' && this.nameControl.value != null){
      this.restaurantService.getRestaurantsByName(this.nameControl.value).subscribe({
        next: data => {console.log(data)},
        error: err => {console.log(err)}
      });
    }
    else{
      console.log("Filter nach Kategorie und Ort!");
    }
  }


  epicFunction() {
    console.log(this.deviceInfo);
    console.log(this.deviceInfo.deviceType);
  }

  changeMobileMode() {
    if (this.showMobile)
      this.showMobile = false;
    else
      this.showMobile = true;
  }

  goToRestaurant() {
    console.log("It Works");
  }

  private _filterLocations(value: string): ZipCode[] {
    const filterValue = value.toLowerCase();
    return this.locations.filter(loc => {
      var l = loc.location + " | " + loc.zipCodeNr;
      return l.toLowerCase().includes(filterValue)
    });
  }
}
