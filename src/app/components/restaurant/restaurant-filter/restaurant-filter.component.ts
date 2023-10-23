import { Component } from '@angular/core';
import { Restaurant } from 'src/app/model/restaurant';
import { RestaurantService } from 'src/app/service/restaurant/restaurant.service';
import { Router } from '@angular/router';
import { RestaurantSearchInfoService } from 'src/app/service/search-info/restaurant-search-info.service';

@Component({
  selector: 'app-restaurant-filter',
  templateUrl: './restaurant-filter.component.html',
  styleUrls: ['./restaurant-filter.component.scss']
})
export class RestaurantFilterComponent {
  restaurants: Restaurant[] = [];

  constructor(private restaurantService: RestaurantService, private router: Router, private searchService: RestaurantSearchInfoService) { }

  ngOnInit(): void {
    this.filter();
  }

  filter() {
    let zipCodeId = -1;
    if (this.searchService.zipCode != null) {
      zipCodeId = this.searchService.zipCode.id;
    }

    let date = this.searchService.date;
    let restaurantName = this.searchService.restaurantName;

    if (restaurantName != null && restaurantName.trim() != '') {
      this.restaurantService.getRestaurantsByName(restaurantName, zipCodeId, date).subscribe({
        next: data => { this.restaurants = data },
        error: err => { console.log(err) }
      });
    }
    else {
      this.restaurantService.getRestaurntsByCategories(this.searchService.categories, zipCodeId, date).subscribe({
        next: data => { this.restaurants = data },
        error: err => { console.log(err) }
      });
    }
  }

  goToRestaurant(id: number) {
    this.router.navigate(['/restaurantView', id]);
  }
}
