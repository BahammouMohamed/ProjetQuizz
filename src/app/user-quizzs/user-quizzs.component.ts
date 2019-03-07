import {HttpClient} from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {UsersService} from "../../services/users.service";
import {QuizzsService} from '../../services/quizzs.service';
import {UtilsService} from '../../services/utils.service';

@Component({
  selector: "app-user-quizzs",
  styleUrls: ["./user-quizzs.component.css"],
  templateUrl: "./user-quizzs.component.html",
})
export class UserQuizzsComponent implements OnInit {
  public  iduser: number;
  public pageQuizzs: any;

  constructor(public http: HttpClient,  public userstsvc: UsersService, public route: ActivatedRoute,
              public quizzsvc: QuizzsService, public utilsvc: UtilsService) { }

  public ngOnInit() {
    this.route.params.subscribe((params) => {
      this.iduser = +this.utilsvc.decrypt(params.idUser); // (+) converts string 'id' to a number
      this.userstsvc.getUserQuizzs(this.iduser)
        .subscribe( (data) => {
          this.pageQuizzs = data;
        }, (err) => {
          console.log(JSON.parse(err._body).message);
        });
    }, (err) => {
      console.log(JSON.parse(err._body).message);
    });
  }

  public deleteQuizz(idQuizz: number) {
    const confirmation = confirm("Etes-vous sur de vouloir supprimer le quizz ? La supression entraine " +
      "la supression de toutes les questions du Quizz");
    if (confirmation) {
      console.log("Confirmation = " + confirmation + " Quizz = " + idQuizz);
      this.quizzsvc.deleteQuizz(idQuizz)
        .subscribe( (data) => {
          console.log("DELETED SUCCESSFULLY");
          this.ngOnInit();
        }, (err) => {
          console.log(JSON.parse(err._body).message);
        });
    } else {
      console.log("Confirmation = " + confirmation + " Quizz = " + idQuizz);
    }
  }
}
