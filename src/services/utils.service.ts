import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { environment } from "../environments/environment";

@Injectable()
export class UtilsService {

  constructor(public http: HttpClient) {
  }
  public crypt(id: any) {
    return btoa(id);
  }

  public decrypt(crypted: any) {
    return atob(crypted);
  }

  public getUserByUsername(username: string) {
    return this.http.get(environment.url + "/users/username/" + username );
  }
}
