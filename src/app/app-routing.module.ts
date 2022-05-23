import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: '',
    component: SidenavComponent, 
    children: [
    { path: '', redirectTo: 'dashboard/home', pathMatch: 'full'},
    { path: 'dashboard/home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },
    { path: 'dashboard/contacto', loadChildren: () => import('./pages/contacto/contacto.module').then(m => m.ContactoModule) },
    ],
  },
  { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule) },
  { path: 'register', loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterModule) },
  { path: 'dashboard', loadChildren: () => import('./components/sidenav/sidenav.module').then(m => m.SidenavModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
