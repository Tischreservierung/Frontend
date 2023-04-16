import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Person } from 'src/app/model/user/person.model';

const API_URL="https://localhost:7259/api/Person";

const httpOptions = {
  headers: new HttpHeaders({
  'Content-Type': 'application/json'
  //,'Authorization': 'my-auth-token'
  })
}

@Injectable({
  providedIn: 'root'
})
export class UserService{
  constructor(private http: HttpClient) { }

  getUserLogIn(email: string, password: string){

    return this.http.get<Person>(API_URL+"/check?email=" + email + "&password=" + password);
  }
}
