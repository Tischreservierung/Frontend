import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DeviceDetectorService, DeviceInfo } from 'ngx-device-detector';

@Component({
  selector: 'app-restaurant-filter',
  templateUrl: './restaurant-filter.component.html',
  styleUrls: ['./restaurant-filter.component.scss']
})
export class RestaurantFilterComponent {
  deviceInfo: DeviceInfo;
  showMobile: boolean = false;

  constructor(private deviceService: DeviceDetectorService, private router:Router) {
    this.deviceInfo = this.deviceService.getDeviceInfo();
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
    this.router.navigate(['/restaurantView', 1]);
  }
}
