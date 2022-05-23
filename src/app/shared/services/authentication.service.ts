import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { UsuarioModel } from "../models/usuario";
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
  })
  export class AuthenticationService {
    readonly userUrl = environment.baseURL_identityService;
    constructor(
        private http: HttpClient,
        public router: Router
      ) {}
    
      logOut() {
        sessionStorage.clear();
        this.router.navigateByUrl('/login');
      }

      logIn(usuario: UsuarioModel) {
        const authData = {
          ...usuario,
        };
        return this.http.post(`${this.userUrl}/authenticate`, authData).pipe(
          map((resp) => {
            return resp;
            console.log(resp);
          })
        );
      }

      isAuthenticated(): boolean {
          return false;
      }
  }