import {HttpClient} from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import "rxjs/add/operator/map";
import {UsersService} from "../../services/users.service";

@Component({
  selector: "app-users",
  styleUrls: ["./users.component.css"],
  templateUrl: "./users.component.html",
})
export class UsersComponent implements OnInit {

  public pageUsers: any;

  constructor(public http: HttpClient, public userstsvc: UsersService) { }

  public ngOnInit() {
    this.userstsvc.getUsers()
      .subscribe( (data) => {
        this.pageUsers = data;
      }, (err) => {
        console.log(JSON.parse(err._body).message);
      });
  }

  public deleteUser(idUser: any) {
    const confirmation = confirm("Etes-vous sur de vouloir supprimer l'utilisateur ? La supression entraine " +
      "la supression de tous les Quizzs de l'utilisateur");
    if (confirmation) {
      console.log("Confirmation = " + confirmation + " User = " + idUser);
      this.userstsvc.deleteUser(idUser)
        .subscribe( (data) => {
          console.log("DELETED SUCCESSFULLY");
          this.ngOnInit();
        }, (err) => {
          console.log(JSON.parse(err._body).message);
        });
    } else {
      console.log("Confirmation = " + confirmation + " User = " + idUser);
    }
  }
}
