import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ReservationList } from 'src/app/model/DTO/reservation-list.model';
import { ReservationService } from 'src/app/service/reservation/reservation.service';

@Component({
  selector: 'app-reservation-management',
  templateUrl: './reservation-management.component.html',
  styleUrls: ['./reservation-management.component.scss']
})
export class ReservationManagementComponent {
  reservations: ReservationList[] = [];

  constructor(private router: Router, private reservationService: ReservationService) {
    
  }

  ngOnInit() {
    this.reservationService.getReservationByRestaurant().subscribe((data) => {
      this.reservations = data;
    });
  }

  checkDate(date: Date){
    return date > new Date();
  }

  goToReservations() {
    this.router.navigate(['/addReservation']);
  }

  back() {
    this.router.navigate(['/']);
  }
}
