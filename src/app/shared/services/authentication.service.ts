import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { UsuarioModel } from "../models/usuario";
import { map } from 'rxjs/operators';
import { ConfigService } from "./config.service";

@Injectable({
    providedIn: 'root',
})
export class AuthenticationService {
    readonly userUrl = environment.baseURL_identityService;
    constructor(
        private http: HttpClient,
        private config: ConfigService,
        public router: Router
    ) { }

    logOut() {
        sessionStorage.clear();
        localStorage.clear();
        this.router.navigateByUrl('/login');
    }

    logIn(item: { correo: any; contrasena: any; }) {
       
        let methodURL = `${this.userUrl}/Users/authenticate?email=${item.correo}&password=${item.contrasena}`;
        return this.config.PostAnonymous(methodURL, item);
    }
    userExist(userId: number) {
        console.log(userId);
        let methodURL = `${this.userUrl}/Users/userExist?userId=${userId}`;
        return this.config.GetAnonymous(methodURL);
    }

    createUser(item: UsuarioModel) {
        let methodURL = `${this.userUrl}/Users/createUser`;
        return this.config.PostAnonymous(methodURL, item);
    }

    getAllUsers(){
        let methodURL = `${this.userUrl}/Users/getAllUsers`;
        return this.config.GetAnonymous(methodURL);
    }
}