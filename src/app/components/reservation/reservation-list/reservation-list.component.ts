import { Component } from '@angular/core';
import { ReservationList } from 'src/app/model/DTO/reservation-list.model';
import { ReservationService } from 'src/app/service/reservation/reservation.service';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.scss']
})
export class ReservationListComponent {
  displayedColumns: string[] = ['restaurant', 'date', 'time'];

  reservations: ReservationList[] = [];
  /*reservations = [{restaurant: "test", date: new Date(), time: new Date()},
  {restaurant: "test2", date: new Date(2023,11,10), time: new Date()},
  {restaurant: "test2", date: new Date(2023,11,10), time: new Date()},
  {restaurant: "test", date: new Date(), time: new Date()}];*/

  constructor(private reservationService: ReservationService) {
    this.reservationService.getReservationsByUser().subscribe((data) => {
      this.reservations = data;
    });
  }

  checkDate(date: Date){
    return date > new Date();
  }
}
