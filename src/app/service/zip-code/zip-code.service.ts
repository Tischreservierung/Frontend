import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ZipCode } from 'src/app/model/zip-code';

const httpOptions = {
  headers: new HttpHeaders({
    'accept': 'text/plain',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': 'true'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ZipCodeService {

  url = 'https://localhost:7259/api/ZipCodes';

  constructor(private http: HttpClient) { }

  getZipCodes() {
    return this.http.get<ZipCode[]>(this.url, httpOptions);
  }
  getZipCodeByZipCodeNrAndLocation(zipCode : string ,location : string){
    return this.http.get<ZipCode>(this.url+"/byZipCodeAndLocation?zipCode="+zipCode+"&location="+location,httpOptions);
  }
}
