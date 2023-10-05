import { Component } from '@angular/core';
import { ReservationOptionDto } from 'src/app/model/DTO/reservation-option';
import { ReservationService } from 'src/app/service/reservation/reservation.service';

@Component({
  selector: 'app-restaurant-reservation',
  templateUrl: './restaurant-reservation.component.html',
  styleUrls: ['./restaurant-reservation.component.scss']
})
export class RestaurantReservationComponent {

  constructor(private reservationService: ReservationService) {

  }

  ngOnInit() {
    this.reservationService.getReservationOptions(1, 1, new Date()).subscribe({
      next: data => { this.reservationOptions = data }
    });
  }

  reservationOptions: ReservationOptionDto[] = [];
}
