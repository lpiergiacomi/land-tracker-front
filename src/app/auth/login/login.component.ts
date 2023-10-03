import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  formLogin!: FormGroup;
  formRegistro!: FormGroup;

  constructor() {

  }

  ngOnInit() {
    this.formLogin = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6)
      ])
    })
    this.formRegistro = new FormGroup({
      username: new FormControl('', [
        Validators.required
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6)
      ]),
      repassword: new FormControl('', [
        Validators.required,
        Validators.minLength(6)
      ])
    })
  }

  get emailLogin() {
    return this.formLogin.get('email');
  }
  get passwordLogin() {
    return this.formLogin.get('password');
  }
  get emailRegistro() {
    return this.formRegistro.get('email');
  }
  get passwordRegistro() {
    return this.formRegistro.get('password');
  }
  get usernameRegistro() {
    return this.formRegistro.get('username');
  }
  get repasswordRegistro() {
    return this.formRegistro.get('repassword');
  }


}
