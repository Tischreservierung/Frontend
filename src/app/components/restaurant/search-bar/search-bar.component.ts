import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable, map, startWith } from 'rxjs';
import { Category } from 'src/app/model/category';
import { ZipCode } from 'src/app/model/zip-code';
import { CategoryService } from 'src/app/service/category/category.service';
import { RestaurantSearchInfoService } from 'src/app/service/search-info/restaurant-search-info.service';
import { ZipCodeService } from 'src/app/service/zip-code/zip-code.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {
  @ViewChild('categoryInput') categoryInput: ElementRef<HTMLInputElement> | null = null;

  categoryControl = new FormControl<string>('');
  zipCodeControl = new FormControl<string>('');

  categories: Category[] = [];
  zipCodes: ZipCode[] = [];

  filteredZipCodes: Observable<ZipCode[]> = new Observable<ZipCode[]>();
  filteredCategories: Observable<Category[]> = new Observable<Category[]>;

  constructor(public searchService: RestaurantSearchInfoService, private catService: CategoryService,
    private zipCodeService: ZipCodeService) { }


  timeSelect(i: number) {
    return new Date(1, 1, 1, 0, i * 30);
  }
  
  ngOnInit(): void {
    this.loadCategories();
    this.loadZipCodes();
  }

  dateFilter = (d: Date | null): boolean => {
    if (d == null)
      return false;

    let now = new Date();
    return d >= now;
  }

  loadCategories() {
    this.catService.getCategories().subscribe({
      next: data => {
        this.categories = data;

        this.filteredCategories = this.categoryControl.valueChanges.pipe(
          startWith(''),
          map(c => (c ? this._filterCategories(c) : this.categories.slice()))
        );
      }
    });
  }

  loadZipCodes() {
    this.zipCodeService.getZipCodes().subscribe({
      next: data => {
        this.zipCodes = data;

        this.filteredZipCodes = this.zipCodeControl.valueChanges.pipe(
          startWith(''),
          map(z => (z ? this._filterZipCodes(z) : this.zipCodes.slice()))
        );
      }
    });
  }

  private _filterZipCodes(value: string): ZipCode[] {
    const filterValue = value.toLowerCase();

    return this.zipCodes.filter(zipCode => {
      let z = zipCode.zipCodeNr + " " + zipCode.location;
      return z.toLowerCase().includes(filterValue);
    });
  }

  private _filterCategories(value: string): Category[] {
    const filterValue = value.toLowerCase();

    return this.categories.filter(category => category.name.toLowerCase().includes(filterValue));
  }

  public removeCategory(category: Category) {
    if (category == null || category == undefined) {
      return;
    }

    let index = this.searchService.categories.indexOf(category);

    if (index >= 0) {
      this.searchService.categories.splice(index, 1);
    }
  }

  public addCategory(category: Category) {
    if (category == null || category == undefined) {
      return;
    }

    if (this.searchService.categories.indexOf(category) == -1) {
      if (this.categoryInput != null) {
        this.categoryInput.nativeElement.value = "";
      }
      this.categoryControl.setValue("");
      this.searchService.categories.push(category);
    }
  }

  public diplayZipCode(zipCode: ZipCode) {
    return zipCode && (zipCode.zipCodeNr + " " + zipCode.location);
  }
}
