import { Component, OnInit } from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {Quizz} from "../../models/models.quizz";
import {User} from "../../models/models.user";
import {QuizzsService} from "../../services/quizzs.service";
import {UsersService} from "../../services/users.service";
import {UtilsService} from '../../services/utils.service';

@Component({
  selector: "app-edit-quizz",
  styleUrls: ["./edit-quizz.component.css"],
  templateUrl: "./edit-quizz.component.html",
})
export class EditQuizzComponent implements OnInit {

  private idquizz: number;
  private quizz: Quizz;
  private mode: number = 1;
  constructor(public quizzsvc: QuizzsService, public route: ActivatedRoute, public utilsvc: UtilsService) {
    this.quizz = new Quizz();
  }

  public ngOnInit() {
    this.route.params.subscribe((params) => {
      this.idquizz = +this.utilsvc.decrypt(params.idQuizz);
      this.quizzsvc.getQuizzById(this.idquizz)
        .subscribe( (quizz) => {
          // @ts-ignore
          this.quizz = quizz;
          console.log("UPDATE QUIZZ : " + this.quizz.id_quizz);
        }, (err) => {
          console.log(JSON.parse(err._body).message);
        });
    }, (err) => {
      console.log(JSON.parse(err._body).message);
    });
  }

  public editQuizz() {
    console.log("UPDATE QUIZZ : " + this.quizz.id_quizz);
    this.quizzsvc.updateQuizz(this.quizz)
      .subscribe( (data) => {
        // @ts-ignore
        this.quizz = data;
        this.mode = 2;
      }, (err) => {
        alert(err.error.message);
        console.log(err);
      });
  }

}
