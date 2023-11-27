import { Time } from '@angular/common';
import { Injectable } from '@angular/core';
import { Category } from 'src/app/model/category';
import { ZipCode } from 'src/app/model/zip-code';

@Injectable({
  providedIn: 'root'
})
export class RestaurantSearchInfoService {

  private _restaurantName: string = "";
  private _date: Date | null = null;
  private _time: string = "0:00"
  private _persons: number = 2;
  private _zipCode: ZipCode | null = null;
  private _categories: Category[] = [];

  public get restaurantName(): string {
    return this._restaurantName;
  }

  public set restaurantName(value: string) {
    this._restaurantName = value;
  }

  public get date(): Date | null {
    return this._date;
  }
  
  public set date(value: Date|null) {
    this._date = value;
  }

  public get time(): string {
    return this._time;
  }

  public set time(value: string) {
    console.log(value)
    this._time = value;
  }
  
  public get persons(): number {
    return this._persons;
  }

  public set persons(value: number) {
    this._persons = value;
  }

  public get zipCode(): ZipCode | null {
    return this._zipCode;
  }

  public set zipCode(value: ZipCode | null) {
    if (value != null && value != undefined) {
      this._zipCode = value;
    }
  }

  public get categories(): Category[] {
    return this._categories;
  }

  public set categories(value: Category[]) {
    this._categories = value;
  }

  constructor() { }
}
