import {HttpClient} from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import "rxjs/add/operator/map";
import {UsersService} from "../../services/users.service";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.css"],
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

}
