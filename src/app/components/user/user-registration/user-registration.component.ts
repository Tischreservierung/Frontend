import { Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { Person } from 'src/app/model/user/person.model';
import { UserService } from 'src/app/service/user/user.service';
import { AuthService } from '@auth0/auth0-angular';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss'],
})

export class UserRegistrationComponent {
  constructor(private formBuilder: FormBuilder, private userService: UserService, public auth: AuthService) {
  }

  formGroup= new FormGroup({
    'email': new FormControl(''),
    'pw': new FormControl('')
  });
  
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  matcher = new MyErrorStateMatcher();

  hide : boolean = true;

  user: Person = {id: 0, name: '', familyName: '', email: '', password: ''};

  myFunction() {
    this.hide = !this.hide;
  }

  openRegisterPage(){
    throw new Error('Method not implemented.');
  }

  logIn(){
    let temp = this.formGroup.controls;

    let email = temp['email'].value;
    let password = temp['pw'].value;
    
    if(email != null && password != null){
      this.userService.getUserLogIn(email, password).subscribe({
        next: data => {
          this.user = data
        },
        error: err => {
          alert("User not found")
        }
      });
    }
  }
}
