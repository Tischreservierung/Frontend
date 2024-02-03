import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ReservationManualDto } from 'src/app/model/DTO/reservation-manual-dto';
import { OpeningTime } from 'src/app/model/opening-time';
import { ReservationService } from 'src/app/service/reservation/reservation.service';
import { RestaurantService } from 'src/app/service/restaurant/restaurant.service';
import { RestaurantSearchInfoService } from 'src/app/service/search-info/restaurant-search-info.service';

@Component({
  selector: 'app-manual-reservation',
  templateUrl: './manual-reservation.component.html',
  styleUrls: ['./manual-reservation.component.scss']
})
export class ManualReservationComponent implements OnInit{

  constructor(private restaurantSearchInfo: RestaurantSearchInfoService, private reservationService : ReservationService,
    private restaurantService : RestaurantService, private router: Router) { }

  ngOnInit(): void {
    this.restaurantService.getOpeningTimes((Number)(this.restaurantService.employee?.restaurantId)).subscribe(data => this.restaurantOpeningTimes = data)
  }
  durations = [60, 90, 120];
  times: Date[] = [];

  restaurantOpeningTimes: OpeningTime[] = [];

  reservateForm = new FormGroup({
    'duration': new FormControl<number>(90),
    'day': new FormControl<Date | null>(null),
    'date': new FormControl<Date | null>(null),
    'time': new FormControl<Date | null>(null),
    'userName': new FormControl<string>(""),
    'numberOfPersons': new FormControl<number>(2),
  });

  getOpeningtimesOfDay() {
    if(this.reservateForm.value.date == null)
      return;
    this.reservationService.getReservationTimesByRestaurantAndDay((Number)(this.restaurantService.employee?.restaurantId), this.reservateForm.value.date!,
     this.reservateForm.value.duration!, this.reservateForm.value.numberOfPersons!)
      .subscribe(data => { this.times = data.map(d => new Date('01/01/1970 ' + d.startTime)); console.log("Times: \n" + this.times[0]); });
  }

  dateFilter = (d: Date | null): boolean => {
    let now = new Date();
    let day = false;
    this.restaurantOpeningTimes.forEach(timeSlot => (timeSlot.day + 1) % 7 == d?.getDay() ? day = true : null);
    
    if (!day)
      return false;

    if (d == null)
      return false;

    return d! > now;
  }

  dateChange() {
    if (this.reservateForm.value.date == null)
      return;
    let d = this.reservateForm.value.date?.getDay();
    let slot: OpeningTime = { day: 0, openFrom: "0:00", openTo: "0:00" };
    this.restaurantOpeningTimes.forEach(timeSlot => timeSlot.day == d ? slot = timeSlot : null);
    this.getOpeningtimesOfDay();
  }

  back() {
    this.router.navigate(['/reservationManagement']);
  }

  reservate(){
    let reservation : ReservationManualDto = { day: this.reservateForm.value.date!,
       duration: this.reservateForm.value.duration!, numberOfPersons: this.reservateForm.value.numberOfPersons!,
        restaurantId: (Number)(this.restaurantService.employee?.restaurantId), userName: this.reservateForm.value.userName!};
    reservation.day.setHours(this.reservateForm.value.time!.getHours()+1);
    reservation.day.setMinutes(this.reservateForm.value.time!.getMinutes());
    console.log(this.reservateForm.value.time!.getHours());

    console.log(reservation);
    this.reservationService.addReservationManually(reservation).subscribe(data => console.log(data));
    this.router.navigate(['/reservationManagement']);
  }
}
