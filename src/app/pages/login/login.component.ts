import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
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
    public router: Router
  ) { }

  ngOnInit(): void {
    if (this.auth.isAuthenticated()) this.router.navigateByUrl('/home');
    else this.auth.logOut();
    this.loginForm = new FormGroup({
      correo: new FormControl('', [Validators.required, Validators.email]),
      contrasena: new FormControl('', Validators.required),
    });
  }

  logOut() {
    sessionStorage.clear();
    this.router.navigateByUrl('/login');
  }

  submit(){
    this.spinner.show();
    this.submitted = true;
    setTimeout(()=> {
      this.spinner.hide();
      this.router.navigateByUrl('/home');
    }, 3000);
    /*this.auth.logIn(this.loginForm.value).subscribe(
      (resp: any) => {
        this.spinner.hide();
        this.router.navigateByUrl('/home');
      }
      ,
      (err) => {
        this.spinner.hide();
        if (err)
          Swal.fire(
            'Error!',
            'Datos incorrectos, por favor validar la información!',
            'error'
          );
        console.log(err);
      }
    );*/
  }

  get f() {
    return this.loginForm.controls;
  }

}
