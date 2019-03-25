import {HttpClient} from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {UsersService} from "../../services/users.service";
import {QuizzsService} from '../../services/quizzs.service';
import {UtilsService} from '../../services/utils.service';

@Component({
  selector: "app-user-quizzs",
  styleUrls: ["./user-quizzs.component.css"],
  templateUrl: "./user-quizzs.component.html",
})
export class UserQuizzsComponent implements OnInit {
  public  iduser: number;
  public pageQuizzs: any;

  constructor(public router:Router ,public http: HttpClient,  public userstsvc: UsersService, public route: ActivatedRoute,
              public quizzsvc: QuizzsService, public utilsvc: UtilsService) { }

  public ngOnInit() {
    this.route.params.subscribe((params) => {
      this.iduser = +this.utilsvc.decrypt(params.idUser);
      this.userstsvc.getUserQuizzs(this.iduser)
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

  public deleteQuizz(idQuizz: number) {
    const confirmation = confirm("Etes-vous sur de vouloir supprimer le quizz ? La supression entraine " +
      "la supression de toutes les questions du Quizz");
    if (confirmation) {
      this.quizzsvc.deleteQuizz(idQuizz)
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
    }
  }
}
