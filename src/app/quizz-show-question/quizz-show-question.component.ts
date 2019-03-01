import {HttpClient} from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import { interval } from "rxjs";
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
  public  cpt: number = 0;
  public reponse: string = "";
  public pageQuestion: any;
  public pageReponses: any;
  public pageIndices: any;
  public questionIndices: string[] = [];
  public hasIndices: boolean = false;

  public found: boolean = false;
  constructor(public http: HttpClient,  public quizzsvc: QuizzsService, public questsvc: QuestionsService,
              public route: ActivatedRoute, public router: Router) { }

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
      this.questsvc.getQuestionReponses(this.idquest)
        .subscribe( (dataRep) => {
          this.pageReponses = dataRep;
        }, (err) => {
          console.log(JSON.parse(err._body).message);
        });
      this.questsvc.getQuestionIndices(this.idquest)
        .subscribe( (dataInd) => {
          this.questionIndices = [];
          this.pageIndices = dataInd;
          this.pageIndices.forEach( (element) => {
            this.questionIndices.push(element.indice);
          });
          if (this.questionIndices.length > 0) {
            this.hasIndices = true;
          }
        }, (err) => {
          console.log(JSON.parse(err._body).message);
        });
      // interval(10000).subscribe(() => alert(this.questionIndices[this.cpt]));
    }, (err) => {
      console.log(JSON.parse(err._body).message);
    });
  }
public repondre(dataForm) {
    /*
    * TODO Enregistrer les réponse correct des eleves
    **/
    this.pageReponses.forEach((element) => {
      if (element.reponse === dataForm.reponse && element.correct === true) {
        // ici la reponse de l'eleve est bonne
        // TODO ici enregistrer la reponse de l'élève dans la BD
        this.found = true;
        console.log("Bonne Réponse : id_question = " + this.idquest);
        console.log("Bonne Réponse : id_user = " + JSON.parse(localStorage.getItem("userID")));
        const tmp = JSON.parse(localStorage.getItem("questionIDs"));
        const index = tmp.indexOf(this.idquest, 0);
        if (index > -1) {
          tmp.splice(index, 1);
        }
        localStorage.setItem("questionIDs", JSON.stringify(tmp));
        if (tmp.length > 0) {
          this.router.navigate(["/showQuizzQuestion/", this.idquizz, tmp[0] ]);
        } else {
          console.log(localStorage.getItem("questionIDs"));
          alert("Quizz terminé !!!!!!!");
          // TODO ici fin de quizz rediriger vers une autre page.
        }
        console.log("SORTED : ");
        for (const i of JSON.parse(localStorage.getItem("questionIDs"))) {
          console.log(i);
        }
        this.reponse = "";
        this.cpt = 0;
      }
    });
    if (!this.found) {
      // ici la reponse de l'eleve n'est pas bonne
      if (this.hasIndices) {
        if (this.cpt <  this.questionIndices.length) {
          alert(this.questionIndices[this.cpt]);
          console.log(this.questionIndices[this.cpt]);
          this.cpt++;
        } else {
          this.cpt = 0;
          console.log("Remise a zéro du compteur des indices");
          alert(this.questionIndices[this.cpt]);
          // alert("Mauvaise Réponse réessayez...");
        }
      } else {
        console.log("Pas d'indices pour cette question");
      }
    }
    this.found = false;
  }
}
