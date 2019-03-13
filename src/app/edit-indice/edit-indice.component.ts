import { Component, OnInit } from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {Indice} from "../../models/models.indice";
import {IndicesService} from "../../services/indices.service";
import {UtilsService} from '../../services/utils.service';

@Component({
  selector: "app-edit-indice",
  styleUrls: ["./edit-indice.component.css"],
  templateUrl: "./edit-indice.component.html",
})
export class EditIndiceComponent implements OnInit {

  private idindice: number;
  private indice: Indice;
  private mode: number = 1;
  constructor(public indicesvc: IndicesService, public route: ActivatedRoute, public utilsvc: UtilsService,public router:Router) {
    this.indice = new Indice();
  }

  public ngOnInit() {
    this.route.params.subscribe((params) => {
      this.idindice =  +this.utilsvc.decrypt(params.idIndice);
      this.indicesvc.getIndiceById(this.idindice)
        .subscribe( (indice) => {
          // @ts-ignore
          this.indice = indice;
          console.log("UPDATE INDICE : " + this.indice.id_indice);
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

  public editIndice() {
    console.log("UPDATE INDICE : " + this.indice.id_indice);
    this.indicesvc.updateIndice(this.indice)
      .subscribe( (data) => {
        // @ts-ignore
        this.indice = data;
        this.mode = 2;
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
