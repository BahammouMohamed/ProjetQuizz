import { Component, OnInit } from "@angular/core";
import {User} from "../../models/models.user";
import {UsersService} from "../../services/users.service";

@Component({
  selector: "app-inscription",
  templateUrl: "./inscription.component.html",
  styleUrls: ["./inscription.component.css"],
})
export class InscriptionComponent implements OnInit {

  private user: User = new User();
  private mode: number = 1;
  constructor(public usersvc: UsersService) { }

  public ngOnInit() {
  }

  public saveUser() {
    this.usersvc.saveUser(this.user)
      .subscribe( (data) => {
        // @ts-ignore
        this.user = data;
        this.mode = 2;
      }, (err) => {
        alert(err.error.message);
        console.log(err);
      });
  }
}
