import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import { environment } from "../environments/environment";
import {User} from "../models/models.user";

@Injectable()
export class UsersService {

  constructor(public http: HttpClient) {
  }
  public getUsers() {
    return this.http.get(environment.url + "/users")
      .map((resp) => resp);
  }

  public getUserQuizzs(id: number) {
    return this.http.get(environment.url + "/users/" + id + "/quizzs")
      .map((resp) => resp);
  }

  public getUserById(id: number) {
    return this.http.get(environment.url + "/users/" + id )
      .map((resp) => resp);
  }

  public saveUser(user: User) {
    return this.http.post(environment.url + "/users", user)
      .map((resp) => resp);
  }

  public updateUser(user: User) {
    return this.http.put(environment.url + "/users/" + user.id, user)
      .map((resp) => resp);
  }

  public deleteUser(idUser: any) {
    return this.http.delete(environment.url + "/users/" + idUser)
      .map((resp) => resp);
  }
}
