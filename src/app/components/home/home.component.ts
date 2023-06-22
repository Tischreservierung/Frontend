import { Time } from '@angular/common';
import { Component} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  nameControl = new FormControl<string>('');

  constructor(private router: Router) {

  }

  goToSearch() {
    this.router.navigate(['/restaurant-filter'],
    {
      queryParams:
      {
        restaurantName: this.nameControl.value
      }
    });
  }
}
