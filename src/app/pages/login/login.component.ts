import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { LocalService } from 'src/app/shared/services/local.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({});
  submitted: boolean = false;

  constructor(
    private auth: AuthenticationService,
    private spinner: NgxSpinnerService,
    private localStorage: LocalService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      correo: new FormControl('', [Validators.required, Validators.email]),
      contrasena: new FormControl('', Validators.required),
    });
  }

  logOut() {
    sessionStorage.clear();
    this.router.navigateByUrl('/login');
  }

  submit() {
    if (this.loginForm.status === "INVALID") {
      Swal.fire(
        'Aviso',
        'Debe rellenar los campos para continuar',
        'warning'
      ).then(() => {
        return;
      })
    } else {
      this.spinner.show("login-spinner");
      this.submitted = true;
      /*setTimeout(()=> {
        this.spinner.hide("login-spinner");
        this.router.navigateByUrl('/dashboard/home');
      }, 3000);*/
      const logData = {
        correo: this.loginForm.controls["correo"].value,
        contrasena: this.loginForm.controls["contrasena"].value
      };

      this.auth.logIn(logData).then(
        (resp: any) => {
          if (resp.success){
            this.localStorage.setJsonValue('nombre', resp.result.email);
            this.localStorage.setJsonValue('id', resp.result.userId);
            console.log(this.localStorage.getJsonValue('nombre'), this.localStorage.getJsonValue('id'));
            this.spinner.hide("login-spinner");
            this.router.navigateByUrl('/dashboard/home');
          } else{
            this.spinner.hide("login-spinner");
            Swal.fire(
              'Fallo al iniciar sesion',
              resp.message,
              'error'
            )
          }
        }
      );
    }

  }

  get f() {
    return this.loginForm.controls;
  }

}
