import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

export interface DialogData {
  name: string;
}

@Component({
  selector: 'app-close-app',
  templateUrl: './close-app.component.html',
  styleUrls: ['./close-app.component.scss']
})
export class CloseAppComponent {

  constructor(
    public dialogRef: MatDialogRef<CloseAppComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private router: Router,
    private auth: AuthenticationService
  ) {}

  exit(): void {
    this.dialogRef.close();
    this.auth.logOut();
  }

}
