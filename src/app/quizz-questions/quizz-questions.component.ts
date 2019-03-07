import {HttpClient} from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import {ActivatedRoute, Router} from '@angular/router';
import {QuizzsService} from "../../services/quizzs.service";
import {ReponsesService} from '../../services/reponses.service';
import {QuestionsService} from '../../services/questions.service';
import {UtilsService} from '../../services/utils.service';

@Component({
  selector: "app-quizz-questions",
  templateUrl: "./quizz-questions.component.html",
  styleUrls: ["./quizz-questions.component.css"],
})
export class QuizzQuestionsComponent implements OnInit {
  public  idquizz: number;
  public pageQuestions: any;
  public hasQuestions: boolean = false;

  constructor(public http: HttpClient,  public quizzsvc: QuizzsService, public route: ActivatedRoute,
              public questionsvc: QuestionsService, public utilsvc: UtilsService) { }

  public ngOnInit() {
    this.route.params.subscribe((params) => {
      this.idquizz = +this.utilsvc.decrypt(params.idQuizz); // (+) converts string 'id' to a number
      this.quizzsvc.getQuizzQuestions(this.idquizz)
        .subscribe( (data) => {
          this.pageQuestions = data;
          if (this.pageQuestions.length > 0) {
            this.hasQuestions = true;
          }
        }, (err) => {
          console.log(JSON.parse(err._body).message);
        });
    }, (err) => {
      console.log(JSON.parse(err._body).message);
    });
  }

  public  deleteQuestion(idQuest: number) {
    const confirmation = confirm("Etes-vous sur de vouloir supprimer la question ? La supression entraineras " +
      "la supression des indices et des réponses");
    if (confirmation) {
      console.log("Confirmation = " + confirmation + " Question = " + idQuest);
      this.questionsvc.deleteQuestion(idQuest)
        .subscribe( (data) => {
          console.log("DELETED SUCCESSFULLY");
          this.ngOnInit();
        }, (err) => {
          console.log(JSON.parse(err._body).message);
        });
    } else {
      console.log("Confirmation = " + confirmation + " Question = " + idQuest);
    }
  }
}
