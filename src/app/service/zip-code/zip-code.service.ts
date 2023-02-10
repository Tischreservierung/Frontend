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

  constructor(private http: HttpClient) { }

  getZipCodes() {
    return this.http.get<ZipCode>('');
  }
}
