import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {QuizzsService} from "../../services/quizzs.service";
import {UtilsService} from "../../services/utils.service";
import {UsersService} from "../../services/users.service";
import {forEach} from "@angular/router/src/utils/collection";

@Component({
  selector: 'app-revision-quizz-list',
  templateUrl: './revision-quizz-list.component.html',
  styleUrls: ['./revision-quizz-list.component.css']
})
export class RevisionQuizzListComponent implements OnInit {

  public iduser: number;
  public pageQuizzs: any = [] ;
  public tmp: any [] = new Array();




  constructor(public router:Router ,public http: HttpClient, public usersSvc: UsersService, public route: ActivatedRoute,
              public utilsvc: UtilsService) { }

  public ngOnInit() {
    this.route.params.subscribe((params) => {
      this.iduser = +this.utilsvc.decrypt(params.idUser);

      this.usersSvc.getMesQuizzs(this.iduser)
        .subscribe( (data) => {
          if (data == null){
            alert("Pas de quizzs");
          }
          else {
              this.tmp = <Array<any>>data;
              this.tmp.forEach(function(item){
                let obj = JSON.parse(item);
                this.pageQuizzs.push(obj.map);
              }, this)
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
