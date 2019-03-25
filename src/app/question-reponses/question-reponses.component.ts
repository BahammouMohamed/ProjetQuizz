import {HttpClient} from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {QuestionsService} from "../../services/questions.service";
import {ReponsesService} from "../../services/reponses.service";
import {UtilsService} from '../../services/utils.service';

@Component({
  selector: "app-question-reponses",
  styleUrls: ["./question-reponses.component.css"],
  templateUrl: "./question-reponses.component.html",
})
export class QuestionReponsesComponent implements OnInit {

  public  idquestion: number;
  public pageReponses: any;

  constructor(public router:Router ,public http: HttpClient,  public questionsvc: QuestionsService, public route: ActivatedRoute,
              public reponsesvc: ReponsesService,
              public utilsvc: UtilsService) { }

  public ngOnInit() {
    this.route.params.subscribe((params) => {
      this.idquestion = +this.utilsvc.decrypt(params.idQuestion); // (+) converts string 'id' to a number
      this.questionsvc.getQuestionReponses(this.idquestion)
        .subscribe( (data) => {
          this.pageReponses = data;
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

  public  deleteReponse(idRep: number) {
    const confirmation = confirm("Etes-vous sur de vouloir supprimer la réponse ?");
    if (confirmation) {
      console.log("Confirmation = " + confirmation + " Réponse = " + idRep);
      this.reponsesvc.deleteReponse(idRep)
        .subscribe( (data) => {
          console.log("DELETED SUCCESSFULLY");
          this.ngOnInit();
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

}
