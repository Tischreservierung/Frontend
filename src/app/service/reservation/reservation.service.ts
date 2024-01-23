import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService, authGuardFn } from '@auth0/auth0-angular';
import { Observable } from 'rxjs/internal/Observable';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { ReservateDto } from 'src/app/model/DTO/reservate-dto.model';
import { ReservationList } from 'src/app/model/DTO/reservation-list.model';
import { ReservationManualDto } from 'src/app/model/DTO/reservation-manual-dto';
import { ReservationTime } from 'src/app/model/DTO/reservation-time.model';
import { environment } from 'src/environments/environment';
import { RestaurantService } from '../restaurant/restaurant.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'accept': 'text/plain'
  })
}

@Injectable({
  providedIn: 'root'
})
export class ReservationService{
  
  url = environment.apiUrl + 'Reservations';
  constructor(private http: HttpClient, private restaurantService : RestaurantService) {
  }

  addReservation(reservation: ReservateDto) {
    return this.http.post<any>(this.url, reservation,
      httpOptions);
  }

  addReservationManually(reservation: ReservationManualDto) {
    return this.http.post<any>(this.url + "/manual", reservation, httpOptions);
  }

  getReservationsByUser() {
    return this.http.get<ReservationList[]>(this.url + "/customer", httpOptions);
  }


  getReservationByRestaurant() {
    return this.http.get<ReservationList[]>(this.url + "/restaurant", httpOptions)
  }

  getReservationTimesByRestaurantAndDay(restaurantId : number, day : Date, duration : number, persons: number){
    return this.http.get<ReservationTime[]>(this.url + "/restaurant/"+restaurantId+"/options" 
    + "?day=" + day.getFullYear()+ "-"+ (day.getMonth()+1) + "-" + day.getDate()+"&duration="+duration+"&seatPlaces="+persons, httpOptions);
  }
}
