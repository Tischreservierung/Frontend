import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { RestaurantSearchInfoService } from 'src/app/service/search-info/restaurant-search-info.service';

@Component({
  selector: 'app-manual-reservation',
  templateUrl: './manual-reservation.component.html',
  styleUrls: ['./manual-reservation.component.scss']
})
export class ManualReservationComponent {

  constructor(private restaurantSearchInfo: RestaurantSearchInfoService) { }


  reservateForm = new FormGroup({
    'duration': new FormControl<number>(90), 'persons': new FormControl<number>(4),
    'note': new FormControl<string>(""), 'date': new FormControl<Date | null>(this.restaurantSearchInfo.date),
    'time': new FormControl<Date | null>(null),
    'userName': new FormControl<string>("")
  });
}
