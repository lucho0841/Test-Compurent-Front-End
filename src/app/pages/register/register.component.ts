import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { UsuarioModel } from 'src/app/shared/models/usuario';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup = new FormGroup({});
  registered: boolean = false;

  constructor(
    private spinner: NgxSpinnerService,
    private auth: AuthenticationService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      nombre: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      identificacion: new FormControl('', [Validators.required, Validators.maxLength(15)]),
      correo: new FormControl('', [Validators.required, Validators.email, Validators.maxLength(50)]),
      contrasena: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      confirmContrasena: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      ciudad: new FormControl('', Validators.maxLength(20)),
      direccion: new FormControl('', [Validators.required, Validators.maxLength(300)]),
      telefono: new FormControl('', Validators.maxLength(20)),
    });
  }

  register(){
    this.registered = true;
    if (this.registerForm.status === "INVALID"){
      this.f.identificacion.errors;
      return;
    }
    this.spinner.show();
    var usuario: UsuarioModel = new UsuarioModel();
    this.auth.getAllUsers().then((res:any) => {
      console.log(res);
      if (res.success){
        usuario.userId = res.result + 1;
      } else{
        Swal.fire(
          'Advertencia',
          res.message,
          'warning'
        ).then(() => {
          return;
        });
      }
    });

    usuario.userName = this.registerForm.controls["nombre"].value;
    usuario.numIdentification = this.registerForm.controls["identificacion"].value;
    usuario.email = this.registerForm.controls["correo"].value;
    usuario.password = this.registerForm.controls["contrasena"].value;
    usuario.city = this.registerForm.controls["ciudad"].value;
    usuario.address = this.registerForm.controls["direccion"].value;
    usuario.phoneNumber = this.registerForm.controls["telefono"].value;
    this.spinner.hide();
    this.auth.createUser(usuario).then((res:any) => {
      if (res.success){
        Swal.fire(
          'Exito',
          res.message,
          'success'
        ).then(()=>{
          this.spinner.hide();
          this.router.navigateByUrl('/login');
        })
      }else{
        Swal.fire(        
        'Error al intentar registrarse',
        res.message,
        'warning'
        )
      }
    });
  }

  get f() {
    return this.registerForm.controls;
  }

}
