import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { Category } from 'src/app/model/category';
import { Restaurant } from 'src/app/model/restaurant';
import { ZipCode } from 'src/app/model/zip-code';
import { CategoryService } from 'src/app/service/category/category.service';
import { RestaurantService } from 'src/app/service/restaurant/restaurant.service';
import { ZipCodeService } from 'src/app/service/zip-code/zip-code.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-restaurant-filter',
  templateUrl: './restaurant-filter.component.html',
  styleUrls: ['./restaurant-filter.component.scss']
})
export class RestaurantFilterComponent implements OnInit {

  categories: Category[] = [];
  locations: ZipCode[] = [];
  filteredLocations: Observable<ZipCode[]> = new Observable<ZipCode[]>();

  categoryControl = new FormControl<Category[] | null>(null);
  locationControl = new FormControl<string>('');
  nameControl = new FormControl<string>('');
  dateControl = new FormControl<Date | null>(null);
  timeControl = new FormControl<Time | null>(null);
  location: ZipCode | null = null;

  restaurants: Restaurant[] = [];


  dateFilter = (d: Date | null): boolean => {
    let now = new Date();

    if(d == null)
      return false;
    if(d.getFullYear() > now.getFullYear())
      return true;
    if(d.getFullYear() == now.getFullYear() && d.getMonth() > now.getMonth())
      return true;
    if(d.getFullYear() == now.getFullYear() && d.getMonth() == now.getMonth() && d.getDate() >= now.getDate())  
      return true;

    return false;
  }

  constructor(private catService: CategoryService, private zipCodeService: ZipCodeService,
    private restaurantService: RestaurantService, private router: Router, private activiatedRoute: ActivatedRoute) {
      this.activiatedRoute.params.subscribe(
        (params: Params)=>{
          this.nameControl.setValue(String(params['restaurantName'] ?? 'x'));
        }
      );
  }

  ngOnInit(): void {


    this.catService.getCategories().subscribe({
      next: data => { this.categories = data; console.log(this.categories) }
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
  }

  filter() {
    let zipCodeId = -1;
    let date = this.dateControl.value;
    if (this.timeControl.value != null && date != null){
      date.setHours(this.timeControl.value.hours);
      date.setMinutes(this.timeControl.value.minutes);
    }


    if (this.location != null)
      zipCodeId = this.location.id;

    if (this.nameControl.value != '' && this.nameControl.value != null) {
      this.restaurantService.getRestaurantsByName(this.nameControl.value, zipCodeId, date).subscribe({
        next: data => { this.restaurants = data },
        error: err => { console.log(err) }
      });
    }
    else {

      this.restaurantService.getRestaurntsByCategories(this.categoryControl.value, zipCodeId, date).subscribe({
        next: data => { this.restaurants = data },
        error: err => { console.log(err) }
      });
      console.log("Filter nach Kategorie und Ort!");
    }
  }

  goToRestaurant(id: number) {
    this.router.navigate(['/restaurantView', id]);
  }

  private _filterLocations(value: string): ZipCode[] {
    const filterValue = value.toLowerCase();
    return this.locations.filter(loc => {
      let l = loc.location + " | " + loc.zipCodeNr;
      return l.toLowerCase().includes(filterValue)
    });
  }
}
