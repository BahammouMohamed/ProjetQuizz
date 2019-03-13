import { Component, OnInit } from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {Reponse} from "../../models/models.reponse";
import {ReponsesService} from "../../services/reponses.service";
import {UtilsService} from '../../services/utils.service';

@Component({
  selector: "app-edit-reponse",
  styleUrls: ["./edit-reponse.component.css"],
  templateUrl: "./edit-reponse.component.html",
})
export class EditReponseComponent implements OnInit {

  private idreponse: number;
  private reponse: Reponse;
  private mode: number = 1;
  constructor(public router:Router  , public reponseesvc: ReponsesService, public route: ActivatedRoute, public utilsvc: UtilsService) {
    this.reponse = new Reponse();
  }

  public ngOnInit() {
    this.route.params.subscribe((params) => {
      this.idreponse = +this.utilsvc.decrypt(params.idReponse);
      this.reponseesvc.getReponseById(this.idreponse)
        .subscribe( (reponse) => {
          // @ts-ignore
          this.reponse = reponse;
          console.log("UPDATE REPONSE : " + this.reponse.id_reponse);
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

  public editReponse() {
    console.log("UPDATE REPONSE : " + this.reponse.id_reponse);
    this.reponseesvc.updateReponse(this.reponse)
      .subscribe( (data) => {
        // @ts-ignore
        this.reponse = data;
        this.mode = 2;
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
