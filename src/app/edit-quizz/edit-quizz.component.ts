import { Component, OnInit } from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {Quizz} from "../../models/models.quizz";
import {QuizzsService} from "../../services/quizzs.service";
import {UtilsService} from "../../services/utils.service";

@Component({
  selector: "app-edit-quizz",
  styleUrls: ["./edit-quizz.component.css"],
  templateUrl: "./edit-quizz.component.html",
})
export class EditQuizzComponent implements OnInit {

  private idquizz: number;
  private iduser: number;
  private quizz: Quizz;
  private mode: number = 1;
  constructor(public router: Router  , public quizzsvc: QuizzsService, public route: ActivatedRoute, public utilsvc: UtilsService) {
    this.quizz = new Quizz();
  }

  public ngOnInit() {
    this.route.params.subscribe((params) => {
      this.idquizz = +this.utilsvc.decrypt(params.idQuizz);
      this.iduser = +localStorage.getItem("userID");
      this.quizzsvc.getQuizzById(this.idquizz)
        .subscribe( (quizz) => {
          // @ts-ignore
          this.quizz = quizz;
        }, (error) => {

          if (error.status == 403) {
            this.router.navigateByUrl("/accessDenied");
          } else if (error.status == 404) {
            this.router.navigateByUrl("/pageIntrouvable");
          } else if (error.status == 401) {
            console.log("La requête nécessite une identification de l'utilisateur");
            this.router.navigateByUrl("/login");
          } else {
            this.router.navigateByUrl("/errorPage");

          }

                });
    }, (error) => {

      if (error.status == 403) {
        this.router.navigateByUrl("/accessDenied");
      } else if (error.status == 404) {
        this.router.navigateByUrl("/pageIntrouvable");
      } else if (error.status == 401) {
        console.log("La requête nécessite une identification de l'utilisateur");
        this.router.navigateByUrl("/login");
      } else {
        this.router.navigateByUrl("/errorPage");

      }

            });
  }

  public editQuizz() {
    this.quizzsvc.updateQuizz(this.quizz)
      .subscribe( (data) => {
        // @ts-ignore
        this.quizz = data;
        this.mode = 2;
      }, (error) => {

        if (error.status == 403) {
          this.router.navigateByUrl("/accessDenied");
        } else if (error.status == 404) {
          this.router.navigateByUrl("/pageIntrouvable");
        } else if (error.status == 401) {
          console.log("La requête nécessite une identification de l'utilisateur");
          this.router.navigateByUrl("/login");
        } else {
          this.router.navigateByUrl("/errorPage");

        }

              });
  }

}
