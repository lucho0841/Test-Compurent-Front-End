import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UsuarioModel } from 'src/app/shared/models/usuario';
import { CloseAppComponent } from 'src/app/shared/popups/close-app/close-app.component';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { LocalService } from 'src/app/shared/services/local.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  result: UsuarioModel = new UsuarioModel();

  constructor(
    private localStorage: LocalService,
    private auth: AuthenticationService,
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    console.log(this.localStorage.getJsonValue('id'));
    this.auth.userExist(this.localStorage.getJsonValue('id')).then((res:any) => {
      if (res.success){
        this.result = res.result;
        console.log(this.result);
      }
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CloseAppComponent, {
      width: '350px',
      data: {name: this.result.userName},
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }

  logout(){
    this.openDialog();
  }

}
