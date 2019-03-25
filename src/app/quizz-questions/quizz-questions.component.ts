import {HttpClient} from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import {ActivatedRoute, Router} from '@angular/router';
import {QuizzsService} from "../../services/quizzs.service";
import {ReponsesService} from '../../services/reponses.service';
import {QuestionsService} from '../../services/questions.service';
import {UtilsService} from '../../services/utils.service';

@Component({
  selector: "app-quizz-questions",
  templateUrl: "./quizz-questions.component.html",
  styleUrls: ["./quizz-questions.component.css"],
})
export class QuizzQuestionsComponent implements OnInit {
  public  idquizz: number;
  public pageQuestions: any;
  public hasQuestions: boolean = false;
  public iduser : number;

  constructor(public router:Router ,public http: HttpClient,  public quizzsvc: QuizzsService, public route: ActivatedRoute,
              public questionsvc: QuestionsService, public utilsvc: UtilsService) { }

  public ngOnInit() {
    this.route.params.subscribe((params) => {
      this.idquizz = +this.utilsvc.decrypt(params.idQuizz);
      this.iduser = +localStorage.getItem("userID");
      this.quizzsvc.getQuizzQuestions(this.idquizz)
        .subscribe( (data) => {
          this.pageQuestions = data;
          if (this.pageQuestions.length > 0) {
            this.hasQuestions = true;
          }
        }, error => {

          if(error.status==403){
            this.router.navigateByUrl('/accessDenied');
          }else if(error.status==404){
            this.router.navigateByUrl('/pageIntrouvable');
          } else if(error.status==401){
            console.log("La requête nécessite une identification de l'utilisateur");
            this.router.navigateByUrl('/login');
          } else{
            this.router.navigateByUrl('/errorPage');
            
          }
  
                });
    },error => {

      if(error.status==403){
        this.router.navigateByUrl('/accessDenied');
      }else if(error.status==404){
        this.router.navigateByUrl('/pageIntrouvable');
      } else if(error.status==401){
        console.log("La requête nécessite une identification de l'utilisateur");
        this.router.navigateByUrl('/login');
      } else{
        this.router.navigateByUrl('/errorPage');
        
      }

            });
  }

  public  deleteQuestion(idQuest: number) {
    const confirmation = confirm("Etes-vous sur de vouloir supprimer la question ? La supression entraineras " +
      "la supression des indices et des réponses");
    if (confirmation) {
      console.log("Confirmation = " + confirmation + " Question = " + idQuest);
      this.questionsvc.deleteQuestion(idQuest)
        .subscribe( (data) => {
          console.log("DELETED SUCCESSFULLY");
          this.ngOnInit();
        }, error => {

          if(error.status==403){
            this.router.navigateByUrl('/accessDenied');
          }else if(error.status==404){
            this.router.navigateByUrl('/pageIntrouvable');
          } else if(error.status==401){
            console.log("La requête nécessite une identification de l'utilisateur");
            this.router.navigateByUrl('/login');
          } else{
            this.router.navigateByUrl('/errorPage');
            
          }
  
                });
    } else {
      console.log("Confirmation = " + confirmation + " Question = " + idQuest);
    }
  }
}
