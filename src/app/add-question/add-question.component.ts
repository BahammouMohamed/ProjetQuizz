import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import {Question} from "../../models/models.question";
import {QuestionsService} from "../../services/questions.service";

@Component({
  selector: "app-add-question",
  styleUrls: ["./add-question.component.css"],
  templateUrl: "./add-question.component.html",
})
export class AddQuestionComponent implements OnInit {
  private idquizz: number;
  private question: Question = new Question();

  constructor(public questionsvc: QuestionsService, public route: ActivatedRoute) { }

  public ngOnInit() {
  }

  public addQuestion(dataForm) {
    // Ici récupérer l'id du quizz et l'injecter dans l'objet JSON de la Question
    this.route.params.subscribe((params) => {
      this.idquizz = +params.idQuizz; // (+) converts string 'id' to a number
      console.log(this.idquizz);
      dataForm.quizz = {id_quizz: this.idquizz };
      this.questionsvc.saveQuestion(dataForm)
        .subscribe( (data) => {
          // @ts-ignore
          this.question = data;
          console.log(data);
        }, (err) => {
          console.log(JSON.parse(err._body).message);
        });
    }, (err) => {
      console.log(JSON.parse(err._body).message);
    });
  }

}
