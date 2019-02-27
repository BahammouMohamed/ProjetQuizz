import {HttpClient} from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import "rxjs/add/operator/map";
import {QuizzsService} from "../../services/quizzs.service";

@Component({
  selector: "app-quizzs",
  templateUrl: "./quizzs.component.html",
  styleUrls: ["./quizzs.component.css"],
})
export class QuizzsComponent implements OnInit {

  public pageQuizzs: any;

  constructor(public http: HttpClient, public quizzstsvc: QuizzsService) { }

  public ngOnInit() {
    this.quizzstsvc.getQuizzs()
      .subscribe( (data) => {
        this.pageQuizzs = data;
      }, (err) => {
        console.log(JSON.parse(err._body).message);
      });
  }
}