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

  constructor(private reservationService: ReservationService) {
    
  }

  ngOnInit() {
    this.reservationService.getReservationsByUser().subscribe((data) => {
      this.reservations = data;
    });
  }

  checkDate(date: Date){
    return date > new Date();
  }
}
