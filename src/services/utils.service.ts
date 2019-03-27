import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { environment } from "../environments/environment";
import {AuthenticationService} from "./authentication.service";

@Injectable()
export class UtilsService {

  constructor(public http: HttpClient, public authService:AuthenticationService) {
  }
  public crypt(id: any) {
    return btoa(id);
  }

  public decrypt(crypted: any) {
    return atob(crypted);
  }

  public getUserByUsername(username: string) {
    return this.http.get(environment.url + "/users/username/" + username,{headers:new HttpHeaders({'Authorization':this.authService.loadToken()})} );
  }
}
