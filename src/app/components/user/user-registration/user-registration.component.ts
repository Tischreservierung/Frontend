import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';

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
  constructor(private formBuilder: FormBuilder) {
    //this.formGroup = this.createForm();
  }

  createForm() {
    return new FormGroup({
      'email': new FormControl(''),
      'password': new FormControl('')
    });
  }

  formGroup= new FormGroup({
    'email': new FormControl(''),
    'pw': new FormControl('')
  });
  
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  matcher = new MyErrorStateMatcher();

  hide : boolean = true;

  myFunction() {
    this.hide = !this.hide;
  }

  openRegisterPage(){

  }

  logIn(){
    let temp = this.formGroup.controls;

    let password = temp['pw'].value;
    let email = temp['email'].value;

    console.log(this.formGroup.value);
    
    //Proof Account + PW
  }
}
