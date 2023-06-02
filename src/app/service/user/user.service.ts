import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Person } from 'src/app/model/user/person.model';
import { environment } from 'src/environments/environment';


const API_URL=environment.apiUrl+"Person";

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
