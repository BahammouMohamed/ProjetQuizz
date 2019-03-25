import { Component, OnInit } from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {Question} from "../../models/models.question";
import {QuestionsService} from "../../services/questions.service";
import {UtilsService} from "../../services/utils.service";

@Component({
  selector: "app-add-question",
  styleUrls: ["./add-question.component.css"],
  templateUrl: "./add-question.component.html",
})
export class AddQuestionComponent implements OnInit {
  private idquizz: number;
  private question: Question = new Question();
  private iduser: number;


  constructor(public questionsvc: QuestionsService, public route: ActivatedRoute, public router: Router,
              public utilsvc: UtilsService) { }

  public ngOnInit() {
    this.route.params.subscribe((params) => {
      this.idquizz = +this.utilsvc.decrypt(params.idQuizz);
      this.iduser = +localStorage.getItem("userID");

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
  }

  public addQuestion(dataForm) {
      dataForm.quizz = {id_quizz: this.idquizz };
      this.questionsvc.saveQuestion(dataForm)
        .subscribe( (data) => {
          // @ts-ignore
          this.question = data;
          this.router.navigate(["/quizzQuestions/", this.utilsvc.crypt(this.idquizz)]);
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

  }

}
