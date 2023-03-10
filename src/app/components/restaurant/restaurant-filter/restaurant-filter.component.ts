import { Component } from '@angular/core';
import { DeviceDetectorService, DeviceInfo } from 'ngx-device-detector';

@Component({
  selector: 'app-restaurant-filter',
  templateUrl: './restaurant-filter.component.html',
  styleUrls: ['./restaurant-filter.component.scss']
})
export class RestaurantFilterComponent {
  deviceInfo: DeviceInfo;
  showMobile: Boolean = false;

  constructor(private deviceService: DeviceDetectorService) {
    this.deviceInfo = this.deviceService.getDeviceInfo();
    this.epicFunction();
  }

  epicFunction() {
    console.log('hello `Home` component');
    const isMobile = this.deviceService.isMobile();
    const isTablet = this.deviceService.isTablet();
    const isDesktopDevice = this.deviceService.isDesktop();
    console.log(this.deviceInfo);
    console.log(isMobile);  // returns if the device is a mobile device (android / iPhone / windows-phone etc)
    console.log(isTablet);  // returns if the device us a tablet (iPad etc)
    console.log(isDesktopDevice); // returns if the app is running on a Desktop browser.
    console.log(this.deviceInfo.deviceType);
  }

  changeMobileMode() {
    if(this.showMobile == true)
      this.showMobile = false;
    else
      this.showMobile = true;
  }
}
