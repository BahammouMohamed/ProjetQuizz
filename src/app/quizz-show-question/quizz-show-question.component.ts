import {HttpClient} from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {QuestionsService} from "../../services/questions.service";
import {QuizzsService} from "../../services/quizzs.service";

@Component({
  selector: "app-quizz-show-question",
  styleUrls: ["./quizz-show-question.component.css"],
  templateUrl: "./quizz-show-question.component.html",

})
export class QuizzShowQuestionComponent implements OnInit {

  public  idquizz: number;
  public  idquest: number;
  public reponse: string = "";
  public pageQuestions: any;
  public pageQuestion: any;
  public pageReponses: any;
  public tmp: any;

  public found: boolean = false;
  constructor(public http: HttpClient,  public quizzsvc: QuizzsService, public questsvc: QuestionsService,
              public route: ActivatedRoute) { }

  public ngOnInit() {
    this.route.params.subscribe((params) => {
      this.idquizz = +params.idQuizz; // (+) converts string 'id' to a number
      this.idquest = +params.idQuestion;
      this.questsvc.getQuestionById(this.idquest)
        .subscribe( (dataQuest) => {
          this.pageQuestion = dataQuest;
        }, (err) => {
          console.log(JSON.parse(err._body).message);
        });
      this.quizzsvc.getQuizzQuestions(this.idquizz)
        .subscribe( (dataQuizz) => {
          this.pageQuestions = dataQuizz;
          this.tmp = this.pageQuestions;
        }, (err) => {
          console.log(JSON.parse(err._body).message);
        });
      this.questsvc.getQuestionReponses(this.idquest)
        .subscribe( (dataRep) => {
          this.pageReponses = dataRep;
        }, (err) => {
          console.log(JSON.parse(err._body).message);
        });
    }, (err) => {
      console.log(JSON.parse(err._body).message);
    });
  }
public repondre(dataForm) {

    this.pageReponses.forEach((element) => {
      if (element.reponse === dataForm.reponse && element.correct === true) {
        // ici la reponse de l'eleve est bonne
        this.found = true;
        console.log("YOPIIIIIIII");
        console.log("rep = " + element.reponse);
        console.log("correct = " + element.correct);
        return 0;
      } else {
        // ici la reponse de l'eleve n'est pas bonne
      }
    });
    console.log("FOUND = " + this.found);
  }

}
