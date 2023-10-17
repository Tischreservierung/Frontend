import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Time } from '@angular/common';
import { RestaurantService } from 'src/app/service/restaurant/restaurant.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent implements OnInit {
  id = "";
  days = [{ day: 'Montag', short: 'MO', id: 0 }, { day: 'Dienstag', short: 'DI', id: 1 }, { day: 'Mittwoch', short: 'MI', id: 2 }
    , { day: 'Donnerstag', short: 'DO', id: 3 }, { day: 'Freitag', short: 'FR', id: 4 }
    , { day: 'Samstag', short: 'SA', id: 5 }, { day: 'Sonntag', short: 'SO', id: 6 }];
  day: number = -1;

  constructor(private router: Router, private restaurantService : RestaurantService) { }
  
  ngOnInit(): void {
    var urlParts: string[] = this.router.url.split('/');
    this.id = urlParts[urlParts.length - 1];
  }
  back() {
    this.router.navigate(['/restaurantView/' + this.id]);
  }
  dateControl = new FormControl<Date | null>(null);
  timeControl = new FormControl<Time | null>(null);

  dateFilter = (d: Date | null): boolean => {
    let now = new Date();

    if (d == null)
      return false;
    if (d.getFullYear() > now.getFullYear())
      return true;
    if (d.getFullYear() == now.getFullYear() && d.getMonth() > now.getMonth())
      return true;
    if (d.getFullYear() == now.getFullYear() && d.getMonth() == now.getMonth() && d.getDate() >= now.getDate())
      return true;

    return false;
  }

}
