import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Usuario} from "../../backend/model/usuario";
import {AuthService} from "../../backend/services/auth.service";
import {take} from "rxjs";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  formLogin!: FormGroup;
  formRegistro!: FormGroup;
  hidePasswordLogin: boolean = true;
  hidePasswordRegister: boolean = true;
  hideRepasswordRegister: boolean = true;
  activeTabIndex: number = 0;

  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService, private jwtHelper: JwtHelperService) {
  }

  ngOnInit() {
    this.formLogin = new FormGroup({
      username: new FormControl('', [
        Validators.required
      ]),
      password: new FormControl('', [
        Validators.required
      ])
    });
    this.formRegistro = new FormGroup({
      username: new FormControl('', [
        Validators.required
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6)
      ]),
      repassword: new FormControl('', [
        Validators.required,
        this.repasswordValidator.bind(this)
      ])
    });

    this.formRegistro.get('password')?.valueChanges.subscribe(() => {
      const repasswordControl = this.formRegistro.get('repassword');
      if (repasswordControl && repasswordControl.dirty) {
        repasswordControl.updateValueAndValidity();
      }
    });
  }

  get usernameLogin() {
    return this.formLogin.get('username');
  }
  get passwordLogin() {
    return this.formLogin.get('password');
  }
  get usernameRegistro() {
    return this.formRegistro.get('username');
  }
  get passwordRegistro() {
    return this.formRegistro.get('password');
  }
  get repasswordRegistro() {
    return this.formRegistro.get('repassword');
  }


  login() {
    const usuario = new Usuario();
    usuario.username = this.usernameLogin.value;
    usuario.password = this.passwordLogin.value;
    this.authService
      .login(usuario)
      .pipe(take(1))
      .subscribe({
        next: (response) => {
          localStorage.setItem('access-token',response.body['access-token'] || '');
          const token = localStorage.getItem('access-token');
          if (token != '') {
            const decodedToken = this.jwtHelper.decodeToken(token);
            localStorage.setItem('token_decoded', JSON.stringify(decodedToken));
            this.authService.setLoggedUser(decodedToken);
            this.router.navigate(['/pages/lotes/mapa']);
          }
        },
        error: (error) => {
          this.toastr.error(error?.error?.message ?? 'Ocurrió un error');
        }
      });
  }

  registrarUsuario() {
    const usuario = new Usuario();
    usuario.username = this.usernameRegistro.value;
    usuario.password = this.passwordRegistro.value;
    this.authService
      .registrarUsuario(usuario)
      .pipe(take(1))
      .subscribe({
        next: (response) => {
          this.toastr.success(`Usuario registrado con éxito`);
          this.reiniciarFormRegistro();
        },
        error: (error) => {
          this.toastr.error(error.error.message);
        }
      });
  }

  repasswordValidator(control: FormControl) {
    const repassword = control.value;
    if (this.formRegistro && this.passwordRegistro.value !== repassword) {
      return {invalidRepassword: true};
    }
    return null;
  }

  getErrorMessageRepassword() {
    if (this.repasswordRegistro.hasError('required')) {
      return 'Debe ingresar una contraseña';
    }
    if (this.repasswordRegistro.hasError('invalidRepassword')) {
      return 'Las contraseñas deben coincidir';
    }
    return '';
  }


  private reiniciarFormRegistro() {
    this.formRegistro.reset();
    this.formRegistro.get('username')?.setErrors(null);
    this.formRegistro.get('password')?.setErrors(null);
    this.formRegistro.get('repassword')?.setErrors(null);
    this.activeTabIndex = 0;
  }
}
