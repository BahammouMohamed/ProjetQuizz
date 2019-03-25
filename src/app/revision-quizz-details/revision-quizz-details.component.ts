import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {UsersService} from "../../services/users.service";
import {UtilsService} from "../../services/utils.service";

@Component({
  selector: 'app-revision-quizz-details',
  templateUrl: './revision-quizz-details.component.html',
  styleUrls: ['./revision-quizz-details.component.css']
})
export class RevisionQuizzDetailsComponent implements OnInit {

  public iduser: number;
  public idPartie : number;
  public pageReponses: any = [] ;
  public tmp: any [] = new Array();

  public score : number;
  public scorePossible : number;




  constructor(public router:Router ,public http: HttpClient, public usersSvc: UsersService, public route: ActivatedRoute,
              public utilsvc: UtilsService) { }

  public ngOnInit() {
    this.route.params.subscribe((params) => {
      this.iduser = +localStorage.getItem("userID");
      this.idPartie = +this.utilsvc.decrypt(params.idPartie);

      this.usersSvc.getMesReponses(this.iduser,this.idPartie)
        .subscribe( (data) => {

          this.tmp = <Array<any>>data;
          this.tmp.forEach(function(item){
            let obj = JSON.parse(item);
            this.pageReponses.push(obj.map);
          }, this);
          this.usersSvc.getMonScore(this.iduser,this.idPartie)
            .subscribe( (data) => {
              const obj = JSON.parse(JSON.stringify(data));
              this.score  = obj.map.score;
              this.scorePossible = obj.map.scoreMax;
            }, error => {

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
