import { Component, OnInit } from '@angular/core';
import { Restaurant } from 'src/app/model/restaurant';
import { ZipCode } from 'src/app/model/zip-code';
import { RestaurantService } from 'src/app/service/restaurant/restaurant.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ZipCodeService } from 'src/app/service/zip-code/zip-code.service';
import { OpeningTime } from 'src/app/model/opening-time';
import { Category } from 'src/app/model/category';
import { CategoryService } from 'src/app/service/category/category.service';


@Component({
  selector: 'app-restaurant-registration',
  templateUrl: './restaurant-registration.component.html',
  styleUrls: ['./restaurant-registration.component.scss']
})
export class RestaurantRegistrationComponent implements OnInit{

  constructor(private resService: RestaurantService, private formBuilder: FormBuilder,
    private zipService: ZipCodeService, private catService: CategoryService) {
   
  }

  ngOnInit(): void {
    this.zipService.getZipCodes().subscribe({
      next: data => { this.zipCodes = data },
      error: error => { /*alert("Fehler" + error.message)*/ }
    });
    this.catService.getCategories().subscribe({
      next: data => { this.categories = data }
    });
  }

  formGroup: FormGroup = this.formBuilder.group({
    'name': new FormControl('', [Validators.required, Validators.minLength(2)]),
    'description': new FormControl(''),
    'zipCode': new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]),
    'location': new FormControl('', [Validators.required]),
    'address': new FormControl('', [Validators.required]),
    'streetNr': new FormControl('', [Validators.required]),
    'openFrom': new FormControl('', [Validators.pattern("([0-1]?[0-9]|2[0-3]):([0-5][0-9])")]),
    'openTo': new FormControl('', [Validators.pattern("([0-1]?[0-9]|2[0-3]):([0-5][0-9])")]),
    'email': new FormControl('', [Validators.required, Validators.email]),
    'password': new FormControl('', [Validators.required, Validators.minLength(8)]),
    'firstName': new FormControl('', [Validators.required, Validators.minLength(2)]),
    'lastName': new FormControl('', [Validators.required, Validators.minLength(2)])
  });

  hide : boolean = true;
  restaurants: Restaurant[] = [];

  day: number = -1; // Selected day
  zipCodes: ZipCode[] = [];

  categoryControl = new FormControl<Category[] | null>(null);
  categories: Category[] = [];

  days = [{ day: 'Montag', short: 'MO', id: 0 }, { day: 'Dienstag', short: 'DI', id: 1 }, { day: 'Mittwoch', short: 'MI', id: 2 }
    , { day: 'Donnerstag', short: 'DO', id: 3 }, { day: 'Freitag', short: 'FR', id: 4 }
    , { day: 'Samstag', short: 'SA', id: 5 }, { day: 'Sonntag', short: 'SO', id: 6 }];

  openings: OpeningTime[] = [];

  // Check if day is already in openings
  openedAt(day: number) {
    return this.openings.some(opening => opening.day == day);
  }

  openingsAt(day: number) {
    return this.openings.filter(opening => opening.day == day);
  }

  addTimeIsValid() : boolean{
    if (this.openings.length >= 14){
      alert("Maximal 14 Öffnungszeiten pro Restaurant");
      return false;
    }
    if (this.day == -1 || this.formGroup.controls['openFrom'].value == '' || this.formGroup.controls['openTo'].value == ''){
      alert("Bitte wählen Sie einen Tag aus und geben Sie die Öffnungszeiten ein!");
      return false;
    }

    return true;
  }

  // Add opening time to openings, if opening times overlap they get kombined into one
  //If closing time is before opening time, the opening time is set to 00:00 and the closing time to the next day
  addTime() {
    if(this.addTimeIsValid()) {
      let open = String(this.formGroup.controls['openFrom'].value).split(':');
      let close = String(this.formGroup.controls['openTo'].value).split(':');

      if ((Number(close[0]) < Number(open[0]) || (Number(close[0]) == Number(open[0]) && Number(close[1]) < Number(open[1])))
        && this.formGroup.controls['openTo'].value != '00:00') {
        this.openings.push({
          day: this.day, openFrom: this.formGroup.controls['openFrom'].value
          , openTo: '00:00'
        });
        this.openings.push({
          day: (this.day + 1) % 7, openFrom: '00:00'
          , openTo: this.formGroup.controls['openTo'].value
        });
      }
      else if((Number(close[0]) == Number(open[0]) && Number(close[1]) == Number(open[1]))){
        alert("Die Öffnungszeiten dürfen nicht gleich sein!");
        return;
      }
      else{
        this.openings.push({
          day: this.day, openFrom: this.formGroup.controls['openFrom'].value
          , openTo: this.formGroup.controls['openTo'].value
        });
      }
      this.openings.sort((a, b) => this.comparator(a, b));

      let i = 0;
      while (i < this.openings.length - 1) {
        if (this.openings[i].day == this.openings[i + 1].day) {
          if (this.openings[i].openTo >= this.openings[i + 1].openFrom || this.openings[i].openTo == '00:00') {
            if (this.openings[i].openTo <= this.openings[i + 1].openTo && this.openings[i].openTo != '00:00')
              this.openings[i].openTo = this.openings[i + 1].openTo;
            this.openings.splice(i + 1, 1);
          }
          else
            i++;
        }
        else
          i++;
      }

    }
    console.log(this.openings);
    console.log(this.categoryControl.value);
  }

  // Commpares two opening times
  comparator(a: OpeningTime, b: OpeningTime) {
    if (a.day > b.day)
      return 1;
    if (a.day < b.day)
      return -1;

    let aT = a.openFrom.split(':');
    let bT = b.openFrom.split(':');
    if (Number(aT[0]) > Number(bT[0]))
      return 1;
    if (Number(aT[0]) < Number(bT[0]))
      return -1;
    if (Number(aT[1]) > Number(bT[1]))
      return 1;
    if (Number(aT[1]) < Number(bT[1]))
      return -1;

    if (a.openTo == '00:00' && b.openTo != '00:00')
      return 1;
    if (a.openTo != '00:00' && b.openTo == '00:00')
      return -1;

    aT = a.openTo.split(':');
    bT = b.openTo.split(':');
    if (Number(aT[0]) > Number(bT[0]))
      return 1;
    if (Number(aT[0]) < Number(bT[0]))
      return -1;
    if (Number(aT[1]) > Number(bT[1]))
      return 1;
    if (Number(aT[1]) < Number(bT[1]))
      return -1;
    return 0;
  }


  removeTime(index: number) {
    this.openings.splice(index, 1);
  }

  removeTimeAt(day: number, index: number) {
    let opening = this.openingsAt(day)[index];
    for(let i = 0; i < this.openings.length; i++){
      if(this.openings[i].day == opening.day && this.openings[i].openFrom == opening.openFrom && this.openings[i].openTo == opening.openTo){
        this.openings.splice(i, 1);
        break;
      }
    }
  }
  
  register() {
    if(this.formGroup.invalid){
      alert("Bitte füllen Sie alle Felder aus!");
      return null;
    }

    let temp = this.formGroup.controls;
    let restaurant: Restaurant;
    let zipCode: ZipCode | null = this.zipCodes.filter(z => z.zipCodeNr == temp['zipCode'].value && z.location == temp['location'].value)[0];
    if (zipCode == null) {
      alert("Bitte geben Sie eine gültige Postleitzahl ein!");
      return null;
    }
    restaurant = {
      name: temp['name'].value, address: temp['address'].value, description: temp['description'].value,
      streetNr: temp['streetNr'].value, zipCode: zipCode, id: 0, openings: this.openings
      , categories: this.categoryControl.value, employee: {email: temp['email'].value, password: temp['password'].value
      , name: temp['firstName'].value, familyName: temp['lastName'].value, isAdmin: true}
    };
    
    this.resService.addRestaurant(restaurant).subscribe({
    
    next: data => { restaurant.id= data;console.log(data); console.log(restaurant); },
      error: error => { alert("Email wird bereits verwendet!") }
    });
    this.resService.getRestaurants().subscribe({ next: data => this.restaurants = data });
    return restaurant;
  }

}
