import { Component, OnInit } from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {Question} from "../../models/models.question";
import {QuestionsService} from "../../services/questions.service";

@Component({
  selector: "app-show-question",
  styleUrls: ["./show-question.component.css"],
  templateUrl: "./show-question.component.html",
})
export class ShowQuestionComponent implements OnInit {

  private idquestion: number;
  private question: Question;
  constructor(public questionsvc: QuestionsService, public route: ActivatedRoute) {
    this.question = new Question();
  }

  public ngOnInit() {
    this.route.params.subscribe((params) => {
      this.idquestion = +params.idQuestion;
      this.questionsvc.getQuestionById(this.idquestion)
        .subscribe( (question) => {
          // @ts-ignore
          this.question = question;
          console.log("SHOW QUESTION : " + this.question.id_question);
        }, (err) => {
          console.log(JSON.parse(err._body).message);
        });
    }, (err) => {
      console.log(JSON.parse(err._body).message);
    });
  }

}
