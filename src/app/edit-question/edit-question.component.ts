import { Component, OnInit } from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {Question} from "../../models/models.question";
import {QuestionsService} from "../../services/questions.service";

@Component({
  selector: "app-edit-question",
  styleUrls: ["./edit-question.component.css"],
  templateUrl: "./edit-question.component.html",
})
export class EditQuestionComponent implements OnInit {

  private idquestion: number;
  private question: Question;
  private mode: number = 1;
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
          console.log("UPDATE QUESTION : " + this.question.id_question);
        }, (err) => {
          console.log(JSON.parse(err._body).message);
        });
    }, (err) => {
      console.log(JSON.parse(err._body).message);
    });
  }

  public editQuestion() {
    console.log("UPDATE QUESTION : " + this.question.id_question);
    this.questionsvc.updateQuestion(this.question)
      .subscribe( (data) => {
        // @ts-ignore
        this.question = data;
        this.mode = 2;
      }, (err) => {
        alert(err.error.message);
        console.log(err);
      });
  }

}
