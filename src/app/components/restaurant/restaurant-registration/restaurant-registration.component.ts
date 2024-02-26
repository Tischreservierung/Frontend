import { Component, OnInit } from '@angular/core';
import { Restaurant } from 'src/app/model/restaurant';
import { ZipCode } from 'src/app/model/zip-code';
import { RestaurantService } from 'src/app/service/restaurant/restaurant.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms'; 
import { ZipCodeService } from 'src/app/service/zip-code/zip-code.service';
import { OpeningTime } from 'src/app/model/opening-time';
import { Category } from 'src/app/model/category';
import { CategoryService } from 'src/app/service/category/category.service';
import { Observable, concatWith, map, startWith } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { ImageCroppedEvent, LoadedImage, base64ToFile } from 'ngx-image-cropper';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { read } from '@popperjs/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-restaurant-registration',
  templateUrl: './restaurant-registration.component.html',
  styleUrls: ['./restaurant-registration.component.scss']
})

export class RestaurantRegistrationComponent implements OnInit {

  categories: Category[] = [];
  zipCodes: ZipCode[] = [];

  constructor(private resService: RestaurantService, private formBuilder: FormBuilder,
    private zipService: ZipCodeService, private catService: CategoryService, private sanitizer: DomSanitizer
    , private http : HttpClient) {

  }

  ngOnInit(): void {
    this.catService.getCategories().subscribe({
      next: data => { this.categories = data }
    });
    this.loadZipCodes();
    //this.imgList.push('data:image/jpg;base64,iVBORw0KGgoAAAANSUhEUgAAAGkAAABMCAYAAABu45m/AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAEnQAABJ0Ad5mH3gAAAC/SURBVHhe7dFBDQAwCACxOcG/SmaDS/qogr6ZWW6TFCApQFKApABJAZICJAVICpAUIClAUoCkAEkBkgIkBUgKkBQgKUBSgKQASQGSAiQFSAqQFCApQFKApABJAZICJAVICpAUIClAUoCkAEkBkgIkBUgKkBQgKUBSgKQASQGSAiQFSAqQFCApQFKApABJAZICJAVICpAUIClAUoCkAEkBkgIkBUgKkBQgKUBSgKQASQGSAiQFSAqQFCApQNJ5sx9LOmJHY0PSVQAAAABJRU5ErkJggg==');
  }

  formGroup: FormGroup = this.formBuilder.group({
    'name': new FormControl('', [Validators.required, Validators.minLength(2)]),
    'description': new FormControl(''),
    'location': new FormControl('', [Validators.required]),
    'address': new FormControl('', [Validators.required]),
    'streetNr': new FormControl('', [Validators.required]),
    'openFrom': new FormControl('', [Validators.pattern("([0-1]?[0-9]|2[0-3]):([0-5][0-9])")]),
    'openTo': new FormControl('', [Validators.pattern("([0-1]?[0-9]|2[0-3]):([0-5][0-9])")]),
    'tableSize': new FormControl('', [Validators.pattern("[0-9]*")]),
    'tableNumber': new FormControl('', [Validators.pattern("[0-9]*")]),
  });

  location: ZipCode | null = null;

  hide: boolean = true;
  restaurants: Restaurant[] = [];

  day: number = -1; // Selected day

  showImage = false;
  imgList: string[] = [];

  categoryControl = new FormControl<Category[] | null>(null);
  
  filteredLocations: Observable<ZipCode[]> = new Observable<ZipCode[]>();
  locations: ZipCode[] = [];

  days = [{ day: 'Montag', short: 'MO', id: 0 }, { day: 'Dienstag', short: 'DI', id: 1 }, { day: 'Mittwoch', short: 'MI', id: 2 }
    , { day: 'Donnerstag', short: 'DO', id: 3 }, { day: 'Freitag', short: 'FR', id: 4 }
    , { day: 'Samstag', short: 'SA', id: 5 }, { day: 'Sonntag', short: 'SO', id: 6 }];

  openings: OpeningTime[] = [];

  loadZipCodes() {
    this.zipService.getZipCodes().subscribe({
      next: data => {
        this.locations = data;
        this.filteredLocations = this.formGroup.controls['location'].valueChanges.pipe(
          startWith(''),
          map(loc => (loc ? this._filterLocations(loc) : this.locations.slice()))
        );
      }
    });
  }

  private _filterLocations(value: string): ZipCode[] {
    const filterValue = value.toLowerCase();
    return this.locations.filter(loc => {
      let l = loc.location + " | " + loc.zipCodeNr;
      return l.toLowerCase().includes(filterValue)
    });
  }

  // Check if day is already in openings
  openedAt(day: number) {
    return this.openings.some(opening => opening.day == day);
  }

  openingsAt(day: number) {
    return this.openings.filter(opening => opening.day == day);
  }

  addTimeIsValid(): boolean {
    if (this.openings.length >= 14) {
      alert("Maximal 14 Öffnungszeiten pro Restaurant");
      return false;
    }
    if (this.day == -1 || this.formGroup.controls['openFrom'].value == '' || this.formGroup.controls['openTo'].value == '') {
      alert("Bitte wählen Sie einen Tag aus und geben Sie die Öffnungszeiten ein!");
      return false;
    }
    return true;
  }

  // Add opening time to openings, if opening times overlap they get kombined into one
  addTime() {
    if (!this.addTimeIsValid())
      return;

    let open = String(this.formGroup.controls['openFrom'].value).split(':');
    let close = String(this.formGroup.controls['openTo'].value).split(':');

    //If closing time is before opening time, the opening time is set to 00:00 and the closing time to the next day
    if ((Number(close[0]) < Number(open[0]) || (Number(close[0]) == Number(open[0]) && Number(close[1]) <= Number(open[1])))
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
    else {
      this.openings.push({
        day: this.day, openFrom: this.formGroup.controls['openFrom'].value
        , openTo: this.formGroup.controls['openTo'].value
      });
    }
    this.openings.sort((a, b) => this.comparator(a, b));

    this.combineOverlappingTimes();
  }

  combineOverlappingTimes(){
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
    for (let i = 0; i < this.openings.length; i++) {
      if (this.openings[i].day == opening.day && this.openings[i].openFrom == opening.openFrom && this.openings[i].openTo == opening.openTo) {
        this.openings.splice(i, 1);
        break;
      }
    }
  }

  register() {
    if (this.formGroup.invalid) {
      alert("Bitte füllen Sie alle Felder aus!");
      return null;
    }

    if (this.imgList.length == 0) {
      alert("Bitte fügen Sie ein Bild ein!")
      return null;
    }

    let temp = this.formGroup.controls;
    console.log(temp);
    let restaurant: Restaurant;
    if (this.location == null) {
      alert("Bitte geben Sie eine gültige Postleitzahl ein!");
      return null;
    }
    restaurant = {
      name: temp['name'].value, address: temp['address'].value, description: temp['description'].value,
      streetNr: temp['streetNr'].value, zipCode: this.location, id: 0, openings: this.openings
      , categories: this.categoryControl.value, pictures: this.imgList, tables: this.ConvertTablesDictionaryToList()
    };
    console.log(restaurant)
    this.resService.addRestaurant(restaurant).subscribe({
      next: data => { restaurant.id = data; console.log(data); console.log(restaurant); 
        this.resService.getRoles();},
      error: error => { alert("Restaurant konnte nicht angelegt werden!") }
    });
    return restaurant;
  }

  async addRes(restaurant: Restaurant){
      this.resService.addRestaurant(restaurant).subscribe();
  }

  remove(img: string){
    this.imgList.splice(this.imgList.indexOf(img), 1);
  }

  switchImgAtIndex(index1: number, index2: number){
    let cache
    cache = this.imgList[index1];
    this.imgList[index1] = this.imgList[index2];
    this.imgList[index2] = cache;
  }

  //image Cropper
  imageChangedEvent: any = '';
  croppedImage: any = '';
  event: Event | null = null;
  imageCache: Blob = new Blob();

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent) {
    if(event.objectUrl != undefined){
      this.croppedImage = this.sanitizer.bypassSecurityTrustUrl(event.objectUrl);

      this.showImage = true;
      console.log("Test");
      console.log(event.blob);

      if(event.blob != undefined)
        this.imageCache = event.blob;
    }
  }

  imageLoaded(image: LoadedImage) {
      
  }
  cropperReady() {
      
  }
  loadImageFailed() {
     
  }

  addToImgList() {
    this.blobToBase64().then(res => {
      var cache = (String)(res).split(',')[1]
      this.imgList.push(cache);
      console.log(this.imgList);
    });
  }

  blobToBase64(){
    return new Promise((resolve,) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(this.imageCache);
    })
  }

  convertImage(base64String :string){
    if(base64String == null) {
      return this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,iVBORw0KGgoAAAANSUhEUgAAAGkAAABMCAYAAABu45m/AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAEnQAABJ0Ad5mH3gAAAC/SURBVHhe7dFBDQAwCACxOcG/SmaDS/qogr6ZWW6TFCApQFKApABJAZICJAVICpAUIClAUoCkAEkBkgIkBUgKkBQgKUBSgKQASQGSAiQFSAqQFCApQFKApABJAZICJAVICpAUIClAUoCkAEkBkgIkBUgKkBQgKUBSgKQASQGSAiQFSAqQFCApQFKApABJAZICJAVICpAUIClAUoCkAEkBkgIkBUgKkBQgKUBSgKQASQGSAiQFSAqQFCApQNJ5sx9LOmJHY0PSVQAAAABJRU5ErkJggg==');
    }
    return this.sanitizer.bypassSecurityTrustResourceUrl('data:image/png;base64,' + base64String);
  }

  dictionary = new Map<number, number>();
  tableList : number[] = [];

  AddTable(){
    let tableSize = this.formGroup.controls['tableSize'].value;
    let tableNumber = this.formGroup.controls['tableNumber'].value;

    if(tableSize > 0 && tableNumber > 0)
    {
      if(this.dictionary.has(tableSize) && !(this.dictionary.get(tableSize) == tableNumber))
      {
        var answer = window.confirm("Tisch mit dieser Größe existiert bereits. \nSoll der bereits existierende Tisch überschrieben werden?");

        if(answer)
        {
          this.dictionary.set(tableSize, tableNumber);
        }
      }
      else
      {
        this.dictionary.set(tableSize, tableNumber);
      }
    }
    else
    {
      alert("Beide Eingabefelder müssen mit einer Zahl die größer als 0 ist ausgefüllt werden!");
    }
  }

  RemoveTable(tableKey : number){
    this.dictionary.delete(tableKey);
  }

  ConvertTablesDictionaryToList(){
    for(let element of this.dictionary){
      for(let i = 0; i < element[1]; i++){
        this.tableList.push(element[0]);
      }
    }

    return this.tableList;
  }
}