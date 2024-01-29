import { Component } from '@angular/core';
import { RestaurantService } from 'src/app/service/restaurant/restaurant.service';
import {  Router } from '@angular/router';
import { RestaurantSearchInfoService } from 'src/app/service/search-info/restaurant-search-info.service';
import { Restaurant } from 'src/app/model/restaurant';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Picture } from 'src/app/model/picture.model';
import { RestaurantFilter } from 'src/app/model/DTO/restaurant-filter.model';

@Component({
  selector: 'app-restaurant-filter',
  templateUrl: './restaurant-filter.component.html',
  styleUrls: ['./restaurant-filter.component.scss']
})
export class RestaurantFilterComponent {
  restaurants: RestaurantFilter[] = [];

  constructor(private restaurantService: RestaurantService,
    private sanitizer: DomSanitizer, private router: Router, private searchService: RestaurantSearchInfoService) { }

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

  imageConverter(value: Picture): SafeResourceUrl{
    if(value == null) {
      return this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,iVBORw0KGgoAAAANSUhEUgAAAGkAAABMCAYAAABu45m/AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAEnQAABJ0Ad5mH3gAAAC/SURBVHhe7dFBDQAwCACxOcG/SmaDS/qogr6ZWW6TFCApQFKApABJAZICJAVICpAUIClAUoCkAEkBkgIkBUgKkBQgKUBSgKQASQGSAiQFSAqQFCApQFKApABJAZICJAVICpAUIClAUoCkAEkBkgIkBUgKkBQgKUBSgKQASQGSAiQFSAqQFCApQFKApABJAZICJAVICpAUIClAUoCkAEkBkgIkBUgKkBQgKUBSgKQASQGSAiQFSAqQFCApQNJ5sx9LOmJHY0PSVQAAAABJRU5ErkJggg==');
    }
    return this.sanitizer.bypassSecurityTrustResourceUrl('data:image/png;base64,' 
      + value.picture);
  }   
}
