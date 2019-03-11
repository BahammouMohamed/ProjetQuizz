import {HttpClient} from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {IndicesService} from "../../services/indices.service";
import {QuestionsService} from "../../services/questions.service";
import {UtilsService} from '../../services/utils.service';

@Component({
  selector: "app-question-indices",
  templateUrl: "./question-indices.component.html",
  styleUrls: ["./question-indices.component.css"],
})
export class QuestionIndicesComponent implements OnInit {

  public  idquestion: number;
  public pageIndices: any;

  constructor(public http: HttpClient,  public questionsvc: QuestionsService, public route: ActivatedRoute,
              public indicesvc: IndicesService,
              public utilsvc: UtilsService) { }

  public ngOnInit() {
    this.route.params.subscribe((params) => {
      this.idquestion = +this.utilsvc.decrypt(params.idQuestion); // (+) converts string 'id' to a number
      this.questionsvc.getQuestionIndices(this.idquestion)
        .subscribe( (data) => {
          this.pageIndices = data;
          console.log(JSON.stringify(this.pageIndices));
        }, (err) => {
          console.log(JSON.parse(err._body).message);
        });
    }, (err) => {
      console.log(JSON.parse(err._body).message);
    });
  }

  public  deleteIndice(idIndice: number) {
    const confirmation = confirm("Etes-vous sur de vouloir supprimer l'indice ?");
    if (confirmation) {
      console.log("Confirmation = " + confirmation + " Indice = " + idIndice);
      this.indicesvc.deleteIndice(idIndice)
        .subscribe( (data) => {
          console.log("DELETED SUCCESSFULLY");
          this.ngOnInit();
        }, (err) => {
          console.log(JSON.parse(err._body).message);
        });
    } else {
      console.log("Confirmation = " + confirmation + " Indice = " + idIndice);
    }
  }
}
