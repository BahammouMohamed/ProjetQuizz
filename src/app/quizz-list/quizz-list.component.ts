import {HttpClient} from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import {ActivatedRoute, Router} from '@angular/router';
import {QuizzsService} from "../../services/quizzs.service";
import {UtilsService} from '../../services/utils.service';

@Component({
  selector: "app-quizz-list",
  styleUrls: ["./quizz-list.component.css"],
  templateUrl: "./quizz-list.component.html",
})
export class QuizzListComponent implements OnInit {
  public iduser: number;
  public pageQuizzs: any;

  constructor(public router:Router ,public http: HttpClient, public quizzstsvc: QuizzsService, public route: ActivatedRoute,
              public utilsvc: UtilsService) { }

  public ngOnInit() {
    this.route.params.subscribe((params) => {
      this.iduser = +this.utilsvc.decrypt(params.idUser); // (+) converts string 'id' to a number
      localStorage.setItem("userID", JSON.stringify(this.iduser));
      this.quizzstsvc.getQuizzs()
        .subscribe( (data) => {
          this.pageQuizzs = data;
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
