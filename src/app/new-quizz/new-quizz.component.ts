import { Component, OnInit } from "@angular/core";
import {Quizz} from "../../models/models.quizz";
import {QuizzsService} from "../../services/quizzs.service";
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: "app-new-quizz",
  templateUrl: "./new-quizz.component.html",
  styleUrls: ["./new-quizz.component.css"],
})
export class NewQuizzComponent implements OnInit {
  private quizz: Quizz = new Quizz();
  private iduser: number;

  constructor(public quizzsvc: QuizzsService, public route: ActivatedRoute) { }

  public ngOnInit() {
    this.route.params.subscribe((params) => {
      this.iduser = +params.idUser; // (+) converts string 'id' to a number
    }, (err) => {
      console.log(JSON.parse(err._body).message);
    });
  }

  public onSaveQuizz(dataForm) {
    // Ici récupérer l'id de l'utilisateur connecter et l'injecter dans l'objet JSON du Quizz
    dataForm.user = {id_user: this.iduser };
    this.quizzsvc.saveQuizz(dataForm)
        .subscribe( (data) => {
          // @ts-ignore
          this.quizz = data;
          console.log(data);
        }, (err) => {
          console.log(JSON.parse(err._body).message);
        });
  }

}
