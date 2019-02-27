import {HttpClient} from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {QuestionsService} from "../../services/questions.service";

@Component({
  selector: "app-question-indices",
  templateUrl: "./question-indices.component.html",
  styleUrls: ["./question-indices.component.css"],
})
export class QuestionIndicesComponent implements OnInit {

  public  idquestion: number;
  public pageIndices: any;

  constructor(public http: HttpClient,  public questionsvc: QuestionsService, public route: ActivatedRoute) { }

  public ngOnInit() {
    this.route.params.subscribe((params) => {
      this.idquestion = +params.idQuestion; // (+) converts string 'id' to a number
      this.questionsvc.getQuestionIndices(this.idquestion)
        .subscribe( (data) => {
          this.pageIndices = data;
        }, (err) => {
          console.log(JSON.parse(err._body).message);
        });
    }, (err) => {
      console.log(JSON.parse(err._body).message);
    });
  }

}
