import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  constructor(private router : Router) { }

  basicData(){
    this.router.navigate(['editbasicdata']);
  }

  tables(){
    this.router.navigate(['edittables']);
  }

  categories(){
    this.router.navigate(['editcategories']);
  }

  openingTimes(){
    this.router.navigate(['editopeningtimes']);
  }

  pictures(){
    this.router.navigate(['editpictures']);
  }
}
