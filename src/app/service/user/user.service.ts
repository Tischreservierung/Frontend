import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService, User } from '@auth0/auth0-angular';
import { Person } from 'src/app/model/user/person.model';
import { environment } from 'src/environments/environment';


const API_URL=environment.apiUrl+"Person";
const MANAGEMENT_URL = 'https://dev-aebw48wxuxofybgz.us.auth0.com/api/v2/users/';

const httpOptions = {
  headers: new HttpHeaders({
  'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class UserService{

  constructor(private http: HttpClient, private auth: AuthService) { 
  }

  getUserLogIn(email: string, password: string){

    return this.http.get<Person>(API_URL+"/check?email=" + email + "&password=" + password);
  }

}
