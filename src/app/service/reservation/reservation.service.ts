import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService, authGuardFn } from '@auth0/auth0-angular';
import { Observable } from 'rxjs/internal/Observable';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { ReservateDto } from 'src/app/model/DTO/reservate-dto.model';
import { ReservationTime } from 'src/app/model/DTO/reservation-time.model';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'accept': 'text/plain',
    'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InkwcUxXX0otdS12TmphcnR3Y2tObCJ9.eyJpc3MiOiJodHRwczovL2Rldi1hZWJ3NDh3eHV4b2Z5Ymd6LnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJTZHdOMmpldFgwY21UeXNPN20xTVNEREZQQzk4djZUSEBjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9yZXNlcnZpbyIsImlhdCI6MTcwMTQxNjM2OCwiZXhwIjoxNzAxNTAyNzY4LCJhenAiOiJTZHdOMmpldFgwY21UeXNPN20xTVNEREZQQzk4djZUSCIsInNjb3BlIjoiY3JlYXRlOnJlc2VydmF0aW9uIGVkaXQ6cmVzdGF1cmFudCBkZWxldGU6cmVzdGF1cmFudCBtYW5hZ2U6cmVzdGF1cmFudCB2aWV3OnJlc2VydmF0aW9uIiwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIn0.Cl_GjgMCXJDI_8olcS7WwcSxEva7oH0mi9vZrFVh9fyp_URaVL1zWZV6tJZGYzw-K2B03QKW3sb5-87OGYr0jiPuYpSbRqp7dpZekBJXYkBxFpvHgTo1IksPqvW1DUPxNmtXuQ9deniFAOFGk9A2GsPlbamxHq17R8-Uvra79csD4I8vgl6BhBPxOSEoWsKNEpAfTZgDMHFbKE4fWS2ZAGZybRKfftah3qWYh5UyMeCZD56HfSbKeCOhdiy528a0HIiAfQ3-RkNyC9QfNngXUajPiYBK27t-_mEAvHYg8XxQFCgBtr6AZC56Kgb0DlKuzbW1E4s2Rn5A5p2Ld8_Oog'
  })
}

@Injectable({
  providedIn: 'root'
})
export class ReservationService{
  
  url = environment.apiUrl + 'Reservations';
  constructor(private http: HttpClient, private auth: AuthService) {
    let token = "";
    /*this.auth.getAccessTokenSilently().subscribe((data: string) => {this.token = data; console.log(this.token); 
      httpOptions.headers = httpOptions.headers.set('Authorization', 'Bearer ' + this.token);
    });*/
  }

  addReservation(reservation: ReservateDto) {
    return this.http.post<any>(this.url, reservation,
      httpOptions);
  }

  getReservationTimesByRestaurantAndDay(restaurantId : number, day : Date, duration : number, persons: number){
    return this.http.get<ReservationTime[]>(this.url + "/restaurant/"+restaurantId+"/options" 
    + "?day=" + day.getFullYear()+ "-"+ (day.getMonth()+1) + "-" + day.getDate()+"&duration="+duration+"&seatPlaces="+persons, httpOptions);
  }
}
