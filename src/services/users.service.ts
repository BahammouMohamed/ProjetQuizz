import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {User} from '../models/models.user';

@Injectable()
export class UsersService {

  constructor(public http: HttpClient) {
  }
  public getUsers() {
    return this.http.get("http://localhost:8080/users")
      .map((resp) => resp);
  }

  public getUserQuizzs(id: number) {
    return this.http.get("http://localhost:8080/users/" + id + "/quizzs")
      .map((resp) => resp);
  }

  public getUserById(id: number) {
    return this.http.get("http://localhost:8080/users/" + id )
      .map((resp) => resp);
  }

  public saveUser(user: User) {
    return this.http.post("http://localhost:8080/users", user)
      .map((resp) => resp);
  }

}
