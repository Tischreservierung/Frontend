import { Component } from '@angular/core';
import { DeviceDetectorService, DeviceInfo } from 'ngx-device-detector';

@Component({
  selector: 'app-restaurant-filter',
  templateUrl: './restaurant-filter.component.html',
  styleUrls: ['./restaurant-filter.component.scss']
})
export class RestaurantFilterComponent {
  deviceInfo: DeviceInfo;
  showMobile: boolean = false;

  constructor(private deviceService: DeviceDetectorService) {
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
    console.log("It Works");
  }
}
