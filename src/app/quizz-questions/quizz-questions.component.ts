import {HttpClient} from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {QuizzsService} from "../../services/quizzs.service";

@Component({
  selector: "app-quizz-questions",
  templateUrl: "./quizz-questions.component.html",
  styleUrls: ["./quizz-questions.component.css"],
})
export class QuizzQuestionsComponent implements OnInit {
  public  idquizz: number;
  public pageQuestions: any;

  constructor(public http: HttpClient,  public quizzsvc: QuizzsService, public route: ActivatedRoute) { }

  public ngOnInit() {
    this.route.params.subscribe((params) => {
      this.idquizz = +params.idQuizz; // (+) converts string 'id' to a number
      this.quizzsvc.getQuizzQuestions(this.idquizz)
        .subscribe( (data) => {
          this.pageQuestions = data;
        }, (err) => {
          console.log(JSON.parse(err._body).message);
        });
    }, (err) => {
      console.log(JSON.parse(err._body).message);
    });
  }
}
