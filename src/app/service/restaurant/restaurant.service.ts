import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from 'src/app/model/category';
import { EmpRestaurant } from 'src/app/model/DTO/emp-restaurant';
import { ReservationView } from 'src/app/model/DTO/reservation-view.model';
import { RestaurantFilter } from 'src/app/model/DTO/restaurant-filter.model';
import { RestaurantViewDto } from 'src/app/model/DTO/restaurant-view-dto.model';
import { OpeningTime } from 'src/app/model/opening-time';
import { Restaurant } from 'src/app/model/restaurant';
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
export class RestaurantService {

  employee: EmpRestaurant | null = null;
  url = environment.apiUrl + 'Restaurants';
  constructor(private http: HttpClient) { }

  addRestaurant(restaurant: Restaurant) {
    return this.http.post<number>(this.url, restaurant,
      httpOptions);
  }

  getRestaurants() {
    return this.http.get<Restaurant[]>(this.url);
  }

  getRoles(){
    this.http.get<EmpRestaurant|null>(this.url + "/employee").subscribe((data) => {this.employee = data, console.log(data)});
  }

  getOpeningTimes(id: number) {
    return this.http.get<OpeningTime[]>(this.url + "/openingTimes/" + id);
  }

  getRestaurantsByName(name: string, zipCodeId: number, dateTime : Date | null) {
    if(dateTime == null)
      return this.http.get<RestaurantFilter[]>(this.url + "/name?name=" + name + "&zipCodeId=" + zipCodeId);
    let date = (dateTime.getMonth() + 1)+ "." + dateTime.getDate()   + "." + dateTime.getFullYear();
    return this.http.get<RestaurantFilter[]>(this.url + "/name?name=" + name + "&zipCodeId=" + zipCodeId+"&dateTime="+date);
  }

  getRestaurntsByCategories(categories: Category[] | null, zipCodeId: number, dateTime: Date | null) {
    let act = this.url + "/categories?zipCodeId=" + zipCodeId;
    if(dateTime != null){
      let date = (dateTime.getMonth() + 1)+ "." + dateTime.getDate()   + "." + dateTime.getFullYear();
      act += "&dateTime="+date;
    }
    if (categories == null)
      return this.http.get<RestaurantFilter[]>(act);
    categories.forEach(element => {
      act += "&categories=" + element.id;
    });
    return this.http.get<RestaurantFilter[]>(act);
  }
  getRestaurantForView(id: number){
    return this.http.get<RestaurantViewDto>(this.url + "/restaurantview/" + id);
  }

  getReservationView(id: number){
    return this.http.get<ReservationView>(this.url + "/reservationview/" + id);
  }
}
