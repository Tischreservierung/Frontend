import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  url = environment.apiUrl + 'Reservations';
  constructor(private http: HttpClient) { }
}
