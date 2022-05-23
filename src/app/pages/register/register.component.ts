import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup = new FormGroup({});
  registered: boolean = false;

  constructor(private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      correo: new FormControl('', [Validators.required, Validators.email]),
      contrasena: new FormControl('', Validators.required),
      confirmContrasena: new FormControl('', Validators.required),
    });
  }

  register(){

  }

  get f() {
    return this.registerForm.controls;
  }

}
