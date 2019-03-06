import {HttpClient} from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {interval, Subject} from "rxjs";
import "rxjs/add/operator/takeUntil";
import {ReponseEleve} from "../../models/models.reponseeleve";
import {QuestionsService} from "../../services/questions.service";
import {QuizzsService} from "../../services/quizzs.service";
import {ReponsesEleveService} from "../../services/reponseseleve.service";

@Component({
  selector: "app-quizz-show-question",
  styleUrls: ["./quizz-show-question.component.css"],
  templateUrl: "./quizz-show-question.component.html",

})
export class QuizzShowQuestionComponent implements OnInit {

  public  idquizz: number;
  public  idquest: number;
  public  cpt: number = 0;
  public reponse_eleve: string = "";
  public pageQuestion: any;
  public pageReponses: any;
  public pageIndices: any;
  public questionIndices: string[] = [];
  public hasIndices: boolean = false;
  public reponseeleve: ReponseEleve = new ReponseEleve();
  public found: boolean = false;
  public htmlToAdd = "";
  public interval: any;
  public destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(public http: HttpClient,  public quizzsvc: QuizzsService, public questsvc: QuestionsService,
              public repelesvc: ReponsesEleveService,
              public route: ActivatedRoute, public router: Router) { }
  public ngOnDestroy() {
    console.log("DESTROY******** ");
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
  public ngOnInit() {
    this.htmlToAdd = "";
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
      this.destroy$.next(false);
      this.interval = interval(10000).takeUntil(this.destroy$).subscribe(() => {
        console.log("INTERVAL : **********");
        this.htmlToAdd = this.questionIndices[this.cpt];
        if (this.cpt <  this.questionIndices.length - 1) {
          this.cpt++;
        } else {
          this.cpt = 0;
        }
      } );
    }, (err) => {
      console.log(JSON.parse(err._body).message);
    });
  }
  public repondre(dataForm) {
    this.found = false;
    const foundRep = this.pageReponses.find((element) => element.reponse === dataForm.reponse_eleve
      && element.correct === true );
    if (foundRep !== undefined) {
      console.log("************* FOUND");
      dataForm.correct = true;
      console.log("Bonne Réponse : id_question = " + this.idquest);
    } else {
      console.log("************* NOT FOUND");
      dataForm.correct = false;
      console.log("Mauvaise Réponse : id_question = " + this.idquest);
    }
    dataForm.question = {id_question: this.idquest };
    dataForm.user = {id_user : JSON.parse(localStorage.getItem("userID")) };
    this.repelesvc.saveReponseEleve(dataForm)
    .subscribe( (data) => {
      // @ts-ignore
      this.reponseeleve = data;
    }, (err) => {
      console.log(JSON.parse(err._body).message);
    });
    this.refresh();
  }
  public ignorer(dataIgnored) {
    // TODO ignorer une question
    dataIgnored.reponse_eleve = "Ignored";
    dataIgnored.question = {id_question: this.idquest };
    dataIgnored.user = {id_user : JSON.parse(localStorage.getItem("userID")) };
    dataIgnored.correct = false;
    this.repelesvc.saveReponseEleve(dataIgnored)
      .subscribe( (data) => {
        // @ts-ignore
        this.reponseeleve = data;
      }, (err) => {
        console.log(JSON.parse(err._body).message);
      });
    console.log("Ignorer la question : id_question = " + this.idquest);
    this.refresh();
  }
  public refresh() {
    console.log("************* REFRESH");
    this.reponse_eleve = "";
    this.cpt = 0;
    this.htmlToAdd = "";
    const tmp = JSON.parse(localStorage.getItem("questionIDs"));
    const index = tmp.indexOf(this.idquest, 0);
    if (index > -1) {
      tmp.splice(index, 1);
    }
    localStorage.setItem("questionIDs", JSON.stringify(tmp));
    if (tmp.length > 0) {
      this.router.navigate(["/showQuizzQuestion/", this.idquizz, tmp[0] ]);
    } else {
      // TODO fin de quizz rediriger vers une autre page.
      this.destroy$.next(true);
      alert("Quizz terminé !!!!!!!");
    }
  }
}
