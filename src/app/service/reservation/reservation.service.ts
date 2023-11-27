import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReservateDto } from 'src/app/model/DTO/reservate-dto.model';
import { ReservationTime } from 'src/app/model/DTO/reservation-time.model';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'accept': 'text/plain'
  })
}

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  url = environment.apiUrl + 'Reservations';
  constructor(private http: HttpClient) { }

  addReservation(reservation: ReservateDto) {
    return this.http.post<any>(this.url, reservation,
      httpOptions);
  }

  getReservationTimesByRestaurantAndDay(restaurantId : number, day : Date, duration : number, persons: number){
    return this.http.get<ReservationTime[]>(this.url + "/restaurant/"+restaurantId+"/options" 
    + "?day=" + day.getFullYear()+ "-"+ day.getMonth() + "-" + day.getDate()+"&duration="+duration+"&seatPlaces="+persons);
  }
}
