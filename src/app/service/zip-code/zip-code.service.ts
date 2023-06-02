import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ZipCode } from 'src/app/model/zip-code';
import { environment } from 'src/environments/environment';


const httpOptions = {
  headers: new HttpHeaders({
    'accept': 'text/plain',
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ZipCodeService {

  url = environment.apiUrl+'ZipCodes';

  constructor(private http: HttpClient) { }

  getZipCodes() {
    return this.http.get<ZipCode[]>(this.url, httpOptions);
  }
  getZipCodeByZipCodeNrAndLocation(zipCode : string ,location : string){
    return this.http.get<ZipCode>(this.url+"/byZipCodeAndLocation?zipCode="+zipCode+"&location="+location,httpOptions);
  }
}
