import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService, authGuardFn } from '@auth0/auth0-angular';
import { Observable } from 'rxjs/internal/Observable';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { ReservateDto } from 'src/app/model/DTO/reservate-dto.model';
import { ReservationTime } from 'src/app/model/DTO/reservation-time.model';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'accept': 'text/plain',
    'Authorization': 'Bearer '
  })
}

@Injectable({
  providedIn: 'root'
})
export class ReservationService{
  
  token = "";
  url = environment.apiUrl + 'Reservations';
  constructor(private http: HttpClient, private auth: AuthService) {
    this.auth.getAccessTokenSilently().subscribe((data: string) => {this.token = data; console.log(this.token); 
      httpOptions.headers = httpOptions.headers.set('Authorization', 'Bearer ' + this.token);
    });
  }

  addReservation(reservation: ReservateDto) {
    return this.http.post<any>(this.url, reservation,
      httpOptions);
  }

  getReservationTimesByRestaurantAndDay(restaurantId : number, day : Date, duration : number, persons: number){
    return this.http.get<ReservationTime[]>(this.url + "/restaurant/"+restaurantId+"/options" 
    + "?day=" + day.getFullYear()+ "-"+ (day.getMonth()+1) + "-" + day.getDate()+"&duration="+duration+"&seatPlaces="+persons, httpOptions);
  }
}
