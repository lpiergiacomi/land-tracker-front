import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../backend/model/user";
import {AuthService} from "../../backend/services/auth.service";
import {take} from "rxjs";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {UserService} from "../../backend/services/user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  loginForm!: FormGroup;
  registerForm!: FormGroup;
  hidePasswordLogin: boolean = true;
  hidePasswordRegister: boolean = true;
  hideRepasswordRegister: boolean = true;
  activeTabIndex: number = 0;

  constructor(private authService: AuthService,
              private router: Router,
              private toastr: ToastrService) {
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl('', [
        Validators.required
      ]),
      password: new FormControl('', [
        Validators.required
      ])
    });
    this.registerForm = new FormGroup({
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

    this.registerForm.get('password')?.valueChanges.subscribe(() => {
      const repasswordControl = this.registerForm.get('repassword');
      if (repasswordControl && repasswordControl.dirty) {
        repasswordControl.updateValueAndValidity();
      }
    });
  }

  get usernameLogin() {
    return this.loginForm.get('username');
  }
  get passwordLogin() {
    return this.loginForm.get('password');
  }
  get usernameRegister() {
    return this.registerForm.get('username');
  }
  get passwordRegister() {
    return this.registerForm.get('password');
  }
  get repasswordRegister() {
    return this.registerForm.get('repassword');
  }


  async login() {
    try {
      const usuario = new User();
      usuario.username = this.usernameLogin.value;
      usuario.password = this.passwordLogin.value;
      const response = await this.authService.login(usuario);
      localStorage.setItem('user_id', response.body['user-id']);
      this.authService.setLoggedUser(response.body['access-token'] || '');
      await this.router.navigate(['/pages/home/dashboard']);
    } catch (error) {
      this.toastr.error(error?.error?.message ?? 'Ocurrió un error');
    }
  }

  async registerUser() {
    try {
      const user = new User();
      user.username = this.usernameRegister.value;
      user.password = this.passwordRegister.value;
      await this.authService.registerUser(user);
      this.toastr.success(`Usuario registrado con éxito`);
      this.resetRegisterForm();
    } catch (error) {
      this.toastr.error(error.error.message);

    }
  }

  repasswordValidator(control: FormControl) {
    const repassword = control.value;
    if (this.registerForm && this.passwordRegister.value !== repassword) {
      return {invalidRepassword: true};
    }
    return null;
  }

  getErrorMessageRepassword() {
    if (this.repasswordRegister.hasError('required')) {
      return 'Debe ingresar una contraseña';
    }
    if (this.repasswordRegister.hasError('invalidRepassword')) {
      return 'Las contraseñas deben coincidir';
    }
    return '';
  }


  private resetRegisterForm() {
    this.registerForm.reset();
    this.registerForm.get('username')?.setErrors(null);
    this.registerForm.get('password')?.setErrors(null);
    this.registerForm.get('repassword')?.setErrors(null);
    this.activeTabIndex = 0;
  }
}
