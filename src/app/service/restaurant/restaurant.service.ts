import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Restaurant } from 'src/app/model/restaurant';


const httpOptions = {
  headers: new HttpHeaders({
  'Content-Type': 'application/json',
  'accept':'text/plain'
  })
}
  

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  constructor(private http: HttpClient) { }

  addRestaurant(restaurant : Restaurant){
    return this.http.post<Restaurant>('https://localhost:7259/api/Restaurants',restaurant,
    httpOptions);
  }

  getRestaurants(){
    return this.http.get<Restaurant[]>('https://localhost:7259/api/Restaurants');
  }
}
