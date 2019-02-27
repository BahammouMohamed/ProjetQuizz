import {HttpClient} from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {QuizzsService} from "../../services/quizzs.service";

@Component({
  selector: "app-quizz-list",
  templateUrl: "./quizz-list.component.html",
  styleUrls: ["./quizz-list.component.css"],
})
export class QuizzListComponent implements OnInit {
  public iduser: number;
  public pageQuizzs: any;

  constructor(public http: HttpClient, public quizzstsvc: QuizzsService, public route: ActivatedRoute) { }

  public ngOnInit() {
    this.route.params.subscribe((params) => {
      this.iduser = +params.idUser; // (+) converts string 'id' to a number
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