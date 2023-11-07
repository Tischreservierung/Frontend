import { Component } from '@angular/core';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.scss']
})
export class ReservationListComponent {
  displayedColumns: string[] = ['restaurant', 'date', 'time'];
  reservations = [{restaurant: "test", date: new Date(), time: new Date()},
  {restaurant: "test2", date: new Date(2023,11,10), time: new Date()},
  {restaurant: "test2", date: new Date(2023,11,10), time: new Date()},
  {restaurant: "test", date: new Date(), time: new Date()}];

  constructor(){
  }

  checkDate(date: Date){
    return date > new Date();
  }
}
