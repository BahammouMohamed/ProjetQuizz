import {HttpClient} from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import "rxjs/add/operator/map";
import {QuizzsService} from "../../services/quizzs.service";
import {ActivatedRoute, Router} from '@angular/router';
import {UtilsService} from '../../services/utils.service';
import { AuthenticationService } from "../../services/authentication.service";

@Component({
  selector: "app-quizzs",
  styleUrls: ["./quizzs.component.css"],
  templateUrl: "./quizzs.component.html",
})
export class QuizzsComponent implements OnInit {

  public pageQuizzs: any;

  constructor(public router:Router,public authService:AuthenticationService ,public http: HttpClient, public quizzstsvc: QuizzsService, public utilsvc: UtilsService) { }

  public ngOnInit() {
    this.quizzstsvc.getQuizzs() 

      .subscribe( (data) => {
        this.pageQuizzs = data;
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
