import { Router } from '@angular/router';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Time } from '@angular/common';
import { RestaurantService } from 'src/app/service/restaurant/restaurant.service';
import { ReservationView } from 'src/app/model/DTO/reservation-view.model';
import { OpeningTime } from 'src/app/model/opening-time';
import { RestaurantSearchInfoService } from 'src/app/service/search-info/restaurant-search-info.service';
import { ReservationService } from 'src/app/service/reservation/reservation.service';
import { ReservateDto } from 'src/app/model/DTO/reservate-dto.model';
import { ReservationTime } from 'src/app/model/DTO/reservation-time.model';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent implements OnInit {
  durations = [60, 90, 120];
  times: Date[] = [];

  restaurantOpeningTimes: OpeningTime[] = [];
  id = "";
  days = [{ day: 'Montag', short: 'MO', id: 0 }, { day: 'Dienstag', short: 'DI', id: 1 }, { day: 'Mittwoch', short: 'MI', id: 2 }
    , { day: 'Donnerstag', short: 'DO', id: 3 }, { day: 'Freitag', short: 'FR', id: 4 }
    , { day: 'Samstag', short: 'SA', id: 5 }, { day: 'Sonntag', short: 'SO', id: 6 }];
  day: number = -1;
  reservationView: ReservationView | null = null;

  reservateForm = new FormGroup({
    'duration': new FormControl<number>(90), 'persons': new FormControl<number>(4),
    'note': new FormControl<string>(""), 'date': new FormControl<Date | null>(this.restaurantSearchInfo.date),
    'time': new FormControl<Date | null>(null)
  });

  constructor(private router: Router, private restaurantService: RestaurantService,public auth: AuthService,
    private restaurantSearchInfo: RestaurantSearchInfoService, private reservationService: ReservationService) { }

  ngOnInit(): void {
    var urlParts: string[] = this.router.url.split('/');
    this.id = urlParts[urlParts.length - 1];
    this.restaurantService.getOpeningTimes(parseInt(this.id)).subscribe(data => this.restaurantOpeningTimes = data)

    this.restaurantService.getReservationView(parseInt(this.id)).subscribe(data => this.reservationView = data);
    this.dateChange();
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

  dateChange() {
    if (this.reservateForm.value.date == null)
      return;
    let d = this.reservateForm.value.date?.getDay();
    let slot: OpeningTime = { day: 0, openFrom: "0:00", openTo: "0:00" };
    this.restaurantOpeningTimes.forEach(timeSlot => timeSlot.day == d ? slot = timeSlot : null);
    this.getOpeningtimesOfDay();
  }

  getOpeningtimesOfDay() {
    if(this.reservateForm.value.date == null)
      return;
    this.reservationService.getReservationTimesByRestaurantAndDay((Number)(this.id), this.reservateForm.value.date!,
     this.reservateForm.value.duration!, this.reservateForm.value.persons!)
      .subscribe(data => { this.times = data.map(d => new Date('01/01/1970 ' + d.startTime)); console.log("Times: \n" + this.times[0]); });
  }

  reservate() {
    let form = this.reservateForm.value;
    console.log(form);
    let date = new Date(form.date!.getFullYear(), form.date!.getMonth(), form.date!.getDate(), form.time!.getHours() + 1, form.time!.getMinutes());
    let reservation: ReservateDto = {
      restaurantId: (Number)(this.id), customerId: 1, day: date,
      duration: form.duration!, numberOfPersons: form.persons!, note: form.note!
    };
    console.log(reservation);
    this.reservationService.addReservation(reservation).subscribe(data => console.log(data));
  }
}
