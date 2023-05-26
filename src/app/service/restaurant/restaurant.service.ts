import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RestaurantViewDto } from 'src/app/model/DTO/restaurant-view-dto.model';
import { Restaurant } from 'src/app/model/restaurant';
import { environment } from 'src/environments/environment.development';



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

  url = environment.apiUrl+'Restaurants';
  constructor(private http: HttpClient) { }

  addRestaurant(restaurant : Restaurant){
    return this.http.post<number>(this.url,restaurant,
    httpOptions);
  }

  getRestaurants(){
    return this.http.get<Restaurant[]>(this.url);
  }

  getRestaurantForView(id: number){
    return this.http.get<RestaurantViewDto>(this.url + "/restaurantview/" + id);
  }
}
