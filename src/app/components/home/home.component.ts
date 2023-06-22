import { Time } from '@angular/common';
import { Component, Query } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  nameControl = new FormControl<string>('');
  dateControl = new FormControl<Date | null>(null);
  timeControl = new FormControl<Time | null>(null);

  dateFilter = (d: Date | null): boolean => {
    let now = new Date();

    if(d == null)
      return false;
    if(d.getFullYear() > now.getFullYear())
      return true;
    if(d.getFullYear() == now.getFullYear() && d.getMonth() > now.getMonth())
      return true;
    if(d.getFullYear() == now.getFullYear() && d.getMonth() == now.getMonth() && d.getDate() >= now.getDate())  
      return true;

    return false;
  }

  constructor(private router: Router) {

  }

  goToSearch() {
    this.router.navigate(['/restaurant-filter'],
    {
      queryParams:
      {
        restaurantName: this.nameControl.value,
        date: this.dateControl.value?.toISOString(),
        time: this.timeControl.value
      }
    });
  }
}
