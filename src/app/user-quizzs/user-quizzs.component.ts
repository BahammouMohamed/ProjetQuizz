import {HttpClient} from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {UsersService} from "../../services/users.service";

@Component({
  selector: "app-user-quizzs",
  styleUrls: ["./user-quizzs.component.css"],
  templateUrl: "./user-quizzs.component.html",
})
export class UserQuizzsComponent implements OnInit {
  public  iduser: number;
  public pageQuizzs: any;

  constructor(public http: HttpClient,  public userstsvc: UsersService, public route: ActivatedRoute) { }

  public ngOnInit() {
    this.route.params.subscribe((params) => {
      this.iduser = +params.idUser; // (+) converts string 'id' to a number
      this.userstsvc.getUserQuizzs(this.iduser)
        .subscribe( (data) => {
          this.pageQuizzs = data;
        }, (err) => {
          console.log(JSON.parse(err._body).message);
        });
    }, (err) => {
      console.log(JSON.parse(err._body).message);
    });
  }

}
