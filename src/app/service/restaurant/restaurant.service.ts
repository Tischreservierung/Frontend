import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Restaurant } from 'src/app/model/restaurant';

const httpOptions = {
  headers: new HttpHeaders({
    'accept': 'text/plain',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': 'true'
  })
};

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  constructor(private http: HttpClient) { }

  addRestaurant(restaurant : Restaurant){
    return this.http.post<Restaurant>(/*'/api/Restaurants'*/'https://localhost:7259/api/Restaurants',restaurant,
    httpOptions).subscribe();
  }
}
