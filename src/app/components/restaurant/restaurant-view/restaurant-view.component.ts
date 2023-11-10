import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { RestaurantViewDto } from 'src/app/model/DTO/restaurant-view-dto.model';
import { RestaurantService } from 'src/app/service/restaurant/restaurant.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser'
import { Restaurant } from 'src/app/model/restaurant';

@Component({
  selector: 'app-restaurant-view',
  templateUrl: './restaurant-view.component.html',
  styleUrls: ['./restaurant-view.component.scss']
})
export class RestaurantViewComponent implements OnInit {
  
  constructor(private router: Router, private restaurantService: RestaurantService, private sanitizer: DomSanitizer) { }

  pageUrl: string = this.router.url;
  urlParts: string[] = this.pageUrl.split('/');
  id: string = this.urlParts[this.urlParts.length - 1];
  pic: string | null = null;
  imagePath: SafeResourceUrl[] = [];

  
  ngOnInit(): void {
    this.restaurantService.getRestaurantForView(Number(this.id)).subscribe({
      next: data => {
        this.restaurant = data;
        this.loadPictures(this.restaurant);
        this.checkTimeFormat();
      },
      error: error => { /*alert("Fehler" + error.message)*/ }
    });
  }

  loadPictures(restaurant: RestaurantViewDto): void{
    restaurant.pictures.forEach(entry => {
      this.pic = entry.picture;
      this.imagePath?.push(this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' 
      + this.pic))
    });

      
  }

  restaurant: RestaurantViewDto | null = null;

  days = [{ day: 'Montag', short: 'MO', id: 0 }, { day: 'Dienstag', short: 'DI', id: 1 }, { day: 'Mittwoch', short: 'MI', id: 2 }
    , { day: 'Donnerstag', short: 'DO', id: 3 }, { day: 'Freitag', short: 'FR', id: 4 }
    , { day: 'Samstag', short: 'SA', id: 5 }, { day: 'Sonntag', short: 'SO', id: 6 }];

  // Check if day is already in openings
  openedAt(day: number) {
    return this.restaurant?.openings.some(opening => opening.day == day);
  }

  openingsAt(day: number) {
    return this.restaurant?.openings.filter(opening => opening.day == day);
  }

  async back() {
    await delay(250);

    this.router.navigate(['/restaurant-filter']);
  }

  checkTimeFormat() {
    this.restaurant?.openings.forEach(timeSlot => {
      let times = timeSlot.openFrom.split(":");
      if (times[0].length == 1) {
        times[0] = "0" + times[0];
      }
      if (times[1].length == 1) {
        times[1] = "0" + times[1];
      }
      timeSlot.openFrom = times[0] + ":" + times[1];

      times = timeSlot.openTo.split(":");
      if (times[0].length == 1) {
        times[0] = "0" + times[0];
      }
      if (times[1].length == 1) {
        times[1] = "0" + times[1];
      }
      timeSlot.openTo = times[0] + ":" + times[1];
    });
  }
}

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

