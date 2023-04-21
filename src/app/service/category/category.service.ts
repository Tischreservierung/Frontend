import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from 'src/app/model/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  url = 'https://localhost:7259/api/RestaurantCategories';

  constructor(private http : HttpClient) { }

  getCategories(){
    return this.http.get<Category[]>(this.url);
  }

}
