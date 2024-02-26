import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
import { Picture } from 'src/app/model/picture.model';
import { RestaurantService } from 'src/app/service/restaurant/restaurant.service';

@Component({
  selector: 'app-pictures',
  templateUrl: './pictures.component.html',
  styleUrls: ['./pictures.component.scss']
})
export class PicturesComponent implements OnInit{

  imageChangedEvent: any = '';
  croppedImage: any = '';
  event: Event | null = null;
  imageCache: Blob = new Blob();
  showImage = false;
  imgList: Picture[] = [];

  preselectedPictures: Picture[] = [];

  constructor(private sanitizer: DomSanitizer, private restaurantService : RestaurantService) { }

  ngOnInit(): void {
    this.restaurantService.getPicturesOfRestaurant().subscribe({next: (data) => 
      { this.preselectedPictures = data; Object.assign(this.imgList, this.preselectedPictures)}});
  }

  
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

  blobToBase64(){
    return new Promise((resolve,) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(this.imageCache);
    })
  }

  addToImgList() {
    this.blobToBase64().then(res => {
      var cache = (String)(res).split(',')[1]
      this.imgList.push({id: 0, picture: cache, index: this.imgList.length, restaurantId: 0});
      console.log(this.imgList);
    });
  }

  imageLoaded(image: LoadedImage) {
      
  }
  cropperReady() {
      
  }
  loadImageFailed() {
     
  }

  remove(img: Picture){
    this.imgList.splice(this.imgList.indexOf(img), 1);
  }

  switchImgAtIndex(index1: number, index2: number){
    let cache
    cache = this.imgList[index1];
    this.imgList[index1] = this.imgList[index2];
    this.imgList[index2] = cache;
  }

  convertImage(base64String :string){
    if(base64String == null) {
      return this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,iVBORw0KGgoAAAANSUhEUgAAAGkAAABMCAYAAABu45m/AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAEnQAABJ0Ad5mH3gAAAC/SURBVHhe7dFBDQAwCACxOcG/SmaDS/qogr6ZWW6TFCApQFKApABJAZICJAVICpAUIClAUoCkAEkBkgIkBUgKkBQgKUBSgKQASQGSAiQFSAqQFCApQFKApABJAZICJAVICpAUIClAUoCkAEkBkgIkBUgKkBQgKUBSgKQASQGSAiQFSAqQFCApQFKApABJAZICJAVICpAUIClAUoCkAEkBkgIkBUgKkBQgKUBSgKQASQGSAiQFSAqQFCApQNJ5sx9LOmJHY0PSVQAAAABJRU5ErkJggg==');
    }
    return this.sanitizer.bypassSecurityTrustResourceUrl('data:image/png;base64,' + base64String);
  }

  save(){
    this.restaurantService.updatePicturesOfRestaurant(this.imgList)
      .subscribe({
        next: (data) => {
          Object.assign(this.preselectedPictures, this.imgList);
        }
      });
  }
  cancel(){
    this.imgList = [];
    Object.assign(this.imgList, this.preselectedPictures);
  }

}
