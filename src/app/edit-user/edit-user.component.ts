import { Component, OnInit } from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {User} from "../../models/models.user";
import {UsersService} from "../../services/users.service";
import {UtilsService} from "../../services/utils.service";

@Component({
  selector: "app-edit-user",
  styleUrls: ["./edit-user.component.css"],
  templateUrl: "./edit-user.component.html",
  })
export class EditUserComponent implements OnInit {
  private iduser: number;
  private user: User;
  private mode: number = 1;
  constructor(public usersvc: UsersService, public route: ActivatedRoute, public utilsvc: UtilsService) {
    this.user = new User();
  }

  public ngOnInit() {
    this.route.params.subscribe((params) => {
      this.iduser = +this.utilsvc.decrypt(params.idUser);
      this.usersvc.getUserById(this.iduser)
        .subscribe( (user) => {
          // @ts-ignore
          this.user = user;
          console.log("UPDATE USER : " + this.user.id);
        }, (err) => {
          console.log(JSON.parse(err._body).message);
        });
    }, (err) => {
      console.log(JSON.parse(err._body).message);
    });
  }

  public editUser() {
    console.log("UPDATE USER : " + this.user.id);
    this.usersvc.updateUser(this.user)
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
