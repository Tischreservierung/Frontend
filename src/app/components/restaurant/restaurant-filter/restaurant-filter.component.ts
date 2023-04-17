import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DeviceDetectorService, DeviceInfo } from 'ngx-device-detector';
import { Category } from 'src/app/model/category';
import { CategoryService } from 'src/app/service/category/category.service';

@Component({
  selector: 'app-restaurant-filter',
  templateUrl: './restaurant-filter.component.html',
  styleUrls: ['./restaurant-filter.component.scss']
})
export class RestaurantFilterComponent implements OnInit{
  deviceInfo: DeviceInfo;
  showMobile: boolean = false;
  categories: Category[] = [];
  categoryControl = new FormControl<Category[] | null>(null);



  constructor(private deviceService: DeviceDetectorService, private catService: CategoryService) {
    this.deviceInfo = this.deviceService.getDeviceInfo();
  }
  ngOnInit(): void {
    this.catService.getCategories().subscribe({
      next: data => { this.categories = data }
    });
    this.epicFunction();
  }

  epicFunction() {
    console.log(this.deviceInfo);
    console.log(this.deviceInfo.deviceType);
  }

  changeMobileMode() {
    if(this.showMobile)
      this.showMobile = false;
    else
      this.showMobile = true;
  }

  goToRestaurant() {
    console.log("It Works");
  }
}
