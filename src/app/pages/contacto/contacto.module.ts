import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactoComponent } from './contacto.component';
import { ContactoRoutingModule } from './contacto-routing.module';
import { SidenavModule } from 'src/app/components/sidenav/sidenav.module';


@NgModule({
  declarations: [
    ContactoComponent,
  ],
  imports: [
    CommonModule,
    ContactoRoutingModule,
    SidenavModule
  ]
})
export class ContactoModule { }