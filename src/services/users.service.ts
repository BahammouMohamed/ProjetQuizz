import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import { environment } from "../environments/environment";
import {User} from "../models/models.user";
import { AuthenticationService } from './authentication.service';



@Injectable()
export class UsersService {

  constructor(public http: HttpClient, public authService:AuthenticationService ) {
  }
  public getUsers() {
    return this.http.get(environment.url + "/users",{headers:new HttpHeaders({'Authorization':this.authService.loadToken()})});    
  }

  public getUserQuizzs(id: number) {
    return this.http.get(environment.url + "/users/" + id + "/quizzs",{headers:new HttpHeaders({'Authorization':this.authService.loadToken()})});
  }

  public getUserById(id: number) {
    return this.http.get(environment.url + "/users/" + id ,{headers:new HttpHeaders({'Authorization':this.authService.loadToken()})});
  }

  public saveUser(user: User) {
    return this.http.post(environment.url + "/users", user)
    .map((resp) => resp);
  }

  public updateUser(user: User) {
    return this.http.put(environment.url + "/users/" + user.id, user,{headers:new HttpHeaders({'Authorization':this.authService.loadToken()})});
  }

  public deleteUser(idUser: any) {
    return this.http.delete(environment.url + "/users/" + idUser,{headers:new HttpHeaders({'Authorization':this.authService.loadToken()})});
  }
}
