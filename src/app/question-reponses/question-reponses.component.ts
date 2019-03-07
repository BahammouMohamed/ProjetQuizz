import {HttpClient} from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {QuestionsService} from "../../services/questions.service";
import {ReponsesService} from "../../services/reponses.service";

@Component({
  selector: "app-question-reponses",
  styleUrls: ["./question-reponses.component.css"],
  templateUrl: "./question-reponses.component.html",
})
export class QuestionReponsesComponent implements OnInit {

  public  idquestion: number;
  public pageReponses: any;

  constructor(public http: HttpClient,  public questionsvc: QuestionsService, public route: ActivatedRoute,
              public reponsesvc: ReponsesService) { }

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

  public  deleteReponse(idRep: number) {
    const confirmation = confirm("Etes-vous sur de vouloir supprimer la réponse ?");
    if (confirmation) {
      console.log("Confirmation = " + confirmation + " Réponse = " + idRep);
      this.reponsesvc.deleteReponse(idRep)
        .subscribe( (data) => {
          console.log("DELETED SUCCESSFULLY");
          this.ngOnInit();
        }, (err) => {
          console.log(JSON.parse(err._body).message);
        });
    } else {
      console.log("Confirmation = " + confirmation + " Réponse = " + idRep);
    }
  }

}
