import { Component } from '@angular/core';
import { Category } from 'src/app/model/category';

@Component({
  selector: 'app-restaurant-view',
  templateUrl: './restaurant-view.component.html',
  styleUrls: ['./restaurant-view.component.scss']
})
export class RestaurantViewComponent {
  categories: Category[] = [{name: "Kategorie1", id:1, rowversion:''},{name: "Kategorie2", id:2, rowversion:''},{name: "Kategorie3", id:3, rowversion:''}];
  
}
