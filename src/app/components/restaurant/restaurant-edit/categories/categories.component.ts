import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/model/category';
import { CategoryService } from 'src/app/service/category/category.service';
import { RestaurantService } from 'src/app/service/restaurant/restaurant.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  restaurantCategories: Category[] = [];
  preselectedCategories: Category[] = [];
  categories: Category[] = [];

  constructor(private categoryService: CategoryService, private restaurantService: RestaurantService) { }
  ngOnInit(): void {
    this.restaurantService.getCategoriesOfRestaurant()
      .subscribe({
        next: (data) => {
          this.preselectedCategories = data;
          Object.assign(this.restaurantCategories, this.preselectedCategories);
        }
      });
    this.categoryService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
        this.categories.sort((a, b) => a.name.localeCompare(b.name));
      }
    });
  }

  remove(i: number) {
    this.restaurantCategories.splice(i, 1);
  }

  containsCategory(id: number) {
    return this.restaurantCategories.find(c => c.id == id);
  }

  select(category: Category) {
    if (this.containsCategory(category.id)) {
      this.remove(this.restaurantCategories.findIndex(c => c.id == category.id));
    } else {
      this.restaurantCategories.push(category);
    }
  }

  cancel() {
    this.restaurantCategories = [];
    Object.assign(this.restaurantCategories, this.preselectedCategories);
  }

  save() {
    this.restaurantService.updateCategoriesOfRestaurant(this.restaurantCategories)
      .subscribe({
        next: (data) => {
          this.preselectedCategories = data;
          this.restaurantCategories = [];
          Object.assign(this.restaurantCategories, this.preselectedCategories);
        }
      });
  }
}
