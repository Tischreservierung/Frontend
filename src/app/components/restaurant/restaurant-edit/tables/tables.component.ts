import { Component, OnInit } from '@angular/core';
import { Table } from 'src/app/model/DTO/table.model';
import { RestaurantService } from 'src/app/service/restaurant/restaurant.service';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {

  tables: Table[] = [];
  previousTables: Table[] = [];
  newTables: { size: number }[] = [];
  newSize: number = 2;
  selectedDate: Date | null = null;
  constructor(private restaurantService: RestaurantService) { }

  ngOnInit(): void {
    this.restaurantService.getTablesOfRestaurant().subscribe({
      next: (data) => {
        this.previousTables = data;
        Object.assign(this.tables, this.previousTables); 
      }
    });
  }

  test(t: Date) {
    this.selectedDate = new Date(t);
  }

  removeTable(index: number) {
    //Remove element by index of newTables
    this.newTables.splice(index, 1);
  }

  dateFilter = (d: Date | null): boolean => {
    if (d == null)
      return false;

    let now = new Date();
    if (this.selectedDate == null)
      return d >= now;
    else
      return d >= now && d >= this.selectedDate;
  }

  save() {
  }

  cancel() {
    this.newTables = [];
    this.tables = [];
    console.log(this.tables);
    Object.assign(this.tables, this.previousTables);
    console.log(this.previousTables);
    console.log(this.tables);
  }
}
