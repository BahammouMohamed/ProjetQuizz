import { Component, OnInit } from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {Quizz} from "../../models/models.quizz";
import {QuizzsService} from "../../services/quizzs.service";
import {UtilsService} from "../../services/utils.service";

@Component({
  selector: "app-new-quizz",
  styleUrls: ["./new-quizz.component.css"],
  templateUrl: "./new-quizz.component.html",
})
export class NewQuizzComponent implements OnInit {
  private quizz: Quizz = new Quizz();
  private iduser: number;

  constructor(public quizzsvc: QuizzsService, public route: ActivatedRoute, public router: Router,
              public utilsvc: UtilsService) { }

  public ngOnInit() {
    this.route.params.subscribe((params) => {
      this.iduser = +this.utilsvc.decrypt(params.idUser);
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
          this.router.navigate(["/userQuizzs/", this.utilsvc.crypt(this.iduser)]);
        }, (err) => {
          console.log(JSON.parse(err._body).message);
        });
  }

}
