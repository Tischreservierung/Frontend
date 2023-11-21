import { Router } from '@angular/router';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Time } from '@angular/common';
import { RestaurantService } from 'src/app/service/restaurant/restaurant.service';
import { ReservationView } from 'src/app/model/DTO/reservation-view.model';
import { OpeningTime } from 'src/app/model/opening-time';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent implements OnInit {
  durations = [60, 90, 120];
  openingTime : Date[] = [];
  
  restaurantOpeningTimes: OpeningTime[] = 
  [{ day: 0, openFrom: "8:00", openTo: "22:00" }, 
  { day: 1, openFrom: "10:00", openTo: "22:00" }, 
  { day: 2, openFrom: "10:00", openTo: "22:00" },
  { day: 3, openFrom: "10:00", openTo: "22:00" },
  { day: 4, openFrom: "10:00", openTo: "22:00" }];
  id = "";
  days = [{ day: 'Montag', short: 'MO', id: 0 }, { day: 'Dienstag', short: 'DI', id: 1 }, { day: 'Mittwoch', short: 'MI', id: 2 }
    , { day: 'Donnerstag', short: 'DO', id: 3 }, { day: 'Freitag', short: 'FR', id: 4 }
    , { day: 'Samstag', short: 'SA', id: 5 }, { day: 'Sonntag', short: 'SO', id: 6 }];
  day: number = -1;
  reservationView : ReservationView | null = null;

  reservateForm = new FormGroup({'duration': new FormControl<number>(90), 'persons': new FormControl<number>(4),
   'note': new FormControl<string>(""), 'date': new FormControl<Date | null>(null), 
   'time': new FormControl<Date | null>(null)});
   
  constructor(private router: Router, private restaurantService : RestaurantService) { }

  ngOnInit(): void {
    var urlParts: string[] = this.router.url.split('/');
    this.id = urlParts[urlParts.length - 1];
    this.restaurantService.getReservationView(parseInt(this.id)).subscribe(data => this.reservationView = data);
  }

  back() {
    this.router.navigate(['/restaurantView/' + this.id]);
  }
  dateControl = new FormControl<Date | null>(null);
  timeControl = new FormControl<Time | null>(null);

  dateFilter = (d: Date | null): boolean => {
    let now = new Date();
    let day = false;
    this.restaurantOpeningTimes.forEach(timeSlot => timeSlot.day == d?.getDay() ? day = true : null);
    if (!day)
      return false;
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

  dateChange(){
    let d = this.reservateForm.value.date?.getDay();
    let slot : OpeningTime = {day: 0, openFrom: "0:00", openTo: "0:00"};
    this.restaurantOpeningTimes.forEach(timeSlot => timeSlot.day == d ? slot = timeSlot : null);
    this.openingTime = [];
    this.openingTime.push(new Date(1,1,1,(Number)(slot.openFrom.split(":")[0]),(Number)(slot.openFrom.split(":")[1])));
    this.openingTime.push(new Date(1,1,1,(Number)(slot.openTo.split(":")[0]),(Number)(slot.openTo.split(":")[1])));
  }

  timeSelect(i: number){
    return new Date(1,1,1,this.openingTime[0].getHours(),this.openingTime[0].getMinutes() + i * 30);
  }

  reservate(){
    console.log(this.reservateForm.value);
  }
}
