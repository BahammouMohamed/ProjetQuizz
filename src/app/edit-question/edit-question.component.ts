import { Component, OnInit } from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {Question} from "../../models/models.question";
import {QuestionsService} from "../../services/questions.service";
import {UtilsService} from '../../services/utils.service';

@Component({
  selector: "app-edit-question",
  styleUrls: ["./edit-question.component.css"],
  templateUrl: "./edit-question.component.html",
})
export class EditQuestionComponent implements OnInit {

  private idquestion: number;
  private question: Question;
  private mode: number = 1;
  constructor(public router:Router ,public questionsvc: QuestionsService, public route: ActivatedRoute, public utilsvc: UtilsService) {
    this.question = new Question();
  }

  public ngOnInit() {
    this.route.params.subscribe((params) => {
      this.idquestion = +this.utilsvc.decrypt(params.idQuestion);
      this.questionsvc.getQuestionById(this.idquestion)
        .subscribe( (question) => {
          // @ts-ignore
          this.question = question;
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

  public editQuestion() {
    this.questionsvc.updateQuestion(this.question)
      .subscribe( (data) => {
        // @ts-ignore
        this.question = data;
        this.mode = 2;
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

}
