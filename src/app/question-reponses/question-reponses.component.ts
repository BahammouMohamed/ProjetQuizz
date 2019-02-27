import {HttpClient} from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {QuestionsService} from "../../services/questions.service";

@Component({
  selector: "app-question-reponses",
  templateUrl: "./question-reponses.component.html",
  styleUrls: ["./question-reponses.component.css"],
})
export class QuestionReponsesComponent implements OnInit {

  public  idquestion: number;
  public pageReponses: any;

  constructor(public http: HttpClient,  public questionsvc: QuestionsService, public route: ActivatedRoute) { }

  public ngOnInit() {
    this.route.params.subscribe((params) => {
      this.idquestion = +params.idQuestion; // (+) converts string 'id' to a number
      this.questionsvc.getQuestionReponses(this.idquestion)
        .subscribe( (data) => {
          this.pageReponses = data;
        }, (err) => {
          console.log(JSON.parse(err._body).message);
        });
    }, (err) => {
      console.log(JSON.parse(err._body).message);
    });
  }

}
