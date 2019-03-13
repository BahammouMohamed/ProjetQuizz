import {HttpClient} from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {IndicesService} from "../../services/indices.service";
import {QuestionsService} from "../../services/questions.service";
import {UtilsService} from '../../services/utils.service';

@Component({
  selector: "app-question-indices",
  templateUrl: "./question-indices.component.html",
  styleUrls: ["./question-indices.component.css"],
})
export class QuestionIndicesComponent implements OnInit {

  public  idquestion: number;
  public pageIndices: any;

  constructor(public router:Router ,public http: HttpClient,  public questionsvc: QuestionsService, public route: ActivatedRoute,
              public indicesvc: IndicesService,
              public utilsvc: UtilsService) { }

  public ngOnInit() {
    this.route.params.subscribe((params) => {
      this.idquestion = +this.utilsvc.decrypt(params.idQuestion); // (+) converts string 'id' to a number
      this.questionsvc.getQuestionIndices(this.idquestion)
        .subscribe( (data) => {
          this.pageIndices = data;
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

  public  deleteIndice(idIndice: number) {
    const confirmation = confirm("Etes-vous sur de vouloir supprimer l'indice ?");
    if (confirmation) {
      console.log("Confirmation = " + confirmation + " Indice = " + idIndice);
      this.indicesvc.deleteIndice(idIndice)
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
      console.log("Confirmation = " + confirmation + " Indice = " + idIndice);
    }
  }
}
