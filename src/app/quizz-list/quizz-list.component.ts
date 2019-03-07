import {HttpClient} from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import {ActivatedRoute, Router} from '@angular/router';
import {QuizzsService} from "../../services/quizzs.service";
import {UtilsService} from '../../services/utils.service';

@Component({
  selector: "app-quizz-list",
  styleUrls: ["./quizz-list.component.css"],
  templateUrl: "./quizz-list.component.html",
})
export class QuizzListComponent implements OnInit {
  public iduser: number;
  public pageQuizzs: any;

  constructor(public http: HttpClient, public quizzstsvc: QuizzsService, public route: ActivatedRoute,
              public utilsvc: UtilsService) { }

  public ngOnInit() {
    this.route.params.subscribe((params) => {
      this.iduser = +this.utilsvc.decrypt(params.idUser); // (+) converts string 'id' to a number
      localStorage.setItem("userID", JSON.stringify(this.iduser));
      this.quizzstsvc.getQuizzs()
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
