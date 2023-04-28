import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from 'src/app/model/category';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  url = environment.apiUrl+'RestaurantCategories';

  constructor(private http : HttpClient) { }

  getCategories(){
    return this.http.get<Category[]>(this.url);
  }

}
