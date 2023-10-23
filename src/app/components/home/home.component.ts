import { Component} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { RestaurantSearchInfoService } from 'src/app/service/search-info/restaurant-search-info.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(private router: Router, public searchService: RestaurantSearchInfoService) {

  }

  goToSearch() {
    this.router.navigate(['/restaurant-filter']);
  }
}
