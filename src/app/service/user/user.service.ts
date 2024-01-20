import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmpRestaurant } from 'src/app/model/DTO/emp-restaurant';
import { Person } from 'src/app/model/user/person.model';
import { environment } from 'src/environments/environment';


const API_URL=environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class UserService{
  constructor(private http: HttpClient) { }
  user : EmpRestaurant | null = null;

  getUserRole(){
    this.http.get<EmpRestaurant>(API_URL + '/Restaurants/employee').subscribe(data => this.user = data);
  }
}
