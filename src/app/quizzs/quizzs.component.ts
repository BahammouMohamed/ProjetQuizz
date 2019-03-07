import {HttpClient} from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import "rxjs/add/operator/map";
import {QuizzsService} from "../../services/quizzs.service";
import {ActivatedRoute} from '@angular/router';
import {UtilsService} from '../../services/utils.service';

@Component({
  selector: "app-quizzs",
  styleUrls: ["./quizzs.component.css"],
  templateUrl: "./quizzs.component.html",
})
export class QuizzsComponent implements OnInit {

  public pageQuizzs: any;

  constructor(public http: HttpClient, public quizzstsvc: QuizzsService, public utilsvc: UtilsService) { }

  public ngOnInit() {
    this.quizzstsvc.getQuizzs()
      .subscribe( (data) => {
        this.pageQuizzs = data;
      }, (err) => {
        console.log(JSON.parse(err._body).message);
      });
  }
}
