import { Component, OnInit } from '@angular/core';
import { Table } from 'src/app/model/DTO/table.model';
import { RestaurantService } from 'src/app/service/restaurant/restaurant.service';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit{

  tables : Table[] = [];
  selectedDate: Date | null = null;
  constructor(private restaurantService: RestaurantService) { }

  ngOnInit(): void {
    this.restaurantService.getTablesOfRestaurant().subscribe({next: (data) => { this.tables = data; }});
  }

  test(t : Date){
    this.selectedDate = new Date(t);
  }

  dateFilter = (d: Date | null): boolean => {
    if (d == null)
      return false;

    let now = new Date();
    if(this.selectedDate == null)
      return d >= now;
    else 
      return d >= now && d >= this.selectedDate;
  }
}
