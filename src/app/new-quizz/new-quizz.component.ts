import { Component, OnInit } from "@angular/core";
import {Quizz} from "../../models/models.quizz";
import {QuizzsService} from "../../services/quizzs.service";

@Component({
  selector: "app-new-quizz",
  templateUrl: "./new-quizz.component.html",
  styleUrls: ["./new-quizz.component.css"],
})
export class NewQuizzComponent implements OnInit {
  private quizz: Quizz = new Quizz();

  constructor(public quizzsvc: QuizzsService) { }

  public ngOnInit() {
  }

  public onSaveQuizz(dataForm) {
    // Ici récupérer l'id de l'utilisateur connecter et l'injecter dans l'objet JSON du Quizz
    dataForm.user = {id_user: dataForm.user };
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
