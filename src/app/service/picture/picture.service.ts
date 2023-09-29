import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Picture } from 'src/app/model/picture.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PictureService {

  url = environment.apiUrl+'RestaurantPicture';

  constructor(private http : HttpClient) { }

  getPicturesByRestaurantId(restaurantId: number){
    return this.http.get<Picture[]>(this.url + '/pictures/restaurantId?restaurantId=' + restaurantId);
  }
}
