import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReservationOption } from 'src/app/model/DTO/reservation-option';
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

  url = environment.apiUrl + 'reservations';
  constructor(private http: HttpClient) { }

  getReservationOptions(restaurantId: number, seatPlaces: number, date: Date) {
    return this.http.get<ReservationOption[]>(environment + "/restaurant/" + restaurantId + "/option?seatPlaces=" + seatPlaces + "&date=" + date);
  }
}
