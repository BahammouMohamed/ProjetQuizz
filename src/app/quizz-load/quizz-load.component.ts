import {HttpClient} from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {QuestionsService} from "../../services/questions.service";
import {QuizzsService} from "../../services/quizzs.service";
import {UtilsService} from '../../services/utils.service';

@Component({
  selector: "app-quizz-load",
  templateUrl: "./quizz-load.component.html",
  styleUrls: ["./quizz-load.component.css"],
})
export class QuizzLoadComponent implements OnInit {

  public  idquizz: number;
  public  idquest: number;
  public reponse: string = "";
  public pageQuestions: any;
  public pageQuestion: any;
  public pageReponses: any;
  public questionIDs: number[] = [];
  public sessionContent: any;

  public found: boolean = false;
  constructor(public http: HttpClient,  public quizzsvc: QuizzsService, public questsvc: QuestionsService,
              public route: ActivatedRoute, public router: Router, public utilsvc: UtilsService) { }

  public ngOnInit() {
    this.route.params.subscribe((params) => {
      this.idquizz = +this.utilsvc.decrypt(params.idQuizz); // (+) converts string 'id' to a number
      this.quizzsvc.getQuizzQuestions(this.idquizz)
        .subscribe( async (dataQuizz) => {
          this.pageQuestions = dataQuizz;
          this.pageQuestions.forEach((element) => {
            this.questionIDs.push(element.id_question);
            this.questionIDs.sort();
          });
          localStorage.setItem("questionIDs", JSON.stringify(this.questionIDs));
          await this.delay(4000);
          this.router.navigate(["/showQuizzQuestion/", this.utilsvc.crypt(this.idquizz),
            this.utilsvc.crypt(this.questionIDs[0])]);

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
  public async delay(ms: number) {
    return new Promise( (resolve) => setTimeout(resolve, ms) );
  }
}
