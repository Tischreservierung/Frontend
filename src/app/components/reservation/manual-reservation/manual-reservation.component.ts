import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ReservationService } from 'src/app/service/reservation/reservation.service';
import { RestaurantSearchInfoService } from 'src/app/service/search-info/restaurant-search-info.service';
import { UserService } from 'src/app/service/user/user.service';

@Component({
  selector: 'app-manual-reservation',
  templateUrl: './manual-reservation.component.html',
  styleUrls: ['./manual-reservation.component.scss']
})
export class ManualReservationComponent {

  constructor(private restaurantSearchInfo: RestaurantSearchInfoService, private reservationService : ReservationService,
    private userService : UserService) { }
  durations = [60, 90, 120];
  times: Date[] = [];


  reservateForm = new FormGroup({
    'duration': new FormControl<number>(90), 'persons': new FormControl<number>(4),
    'note': new FormControl<string>(""), 'date': new FormControl<Date | null>(this.restaurantSearchInfo.date),
    'time': new FormControl<Date | null>(null),
    'userName': new FormControl<string>("")
  });

  getOpeningtimesOfDay() {
    if(this.reservateForm.value.date == null)
      return;
    this.reservationService.getReservationTimesByRestaurantAndDay((Number)(this.userService.user?.restaurantId), this.reservateForm.value.date!,
     this.reservateForm.value.duration!, this.reservateForm.value.persons!)
      .subscribe(data => { this.times = data.map(d => new Date('01/01/1970 ' + d.startTime)); console.log("Times: \n" + this.times[0]); });
  }
}
