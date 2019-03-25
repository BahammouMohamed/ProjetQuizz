import { Component, OnInit } from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {Indice} from "../../models/models.indice";
import {IndicesService} from "../../services/indices.service";
import {UtilsService} from '../../services/utils.service';

@Component({
  selector: "app-add-indice",
  templateUrl: "./add-indice.component.html",
  styleUrls: ["./add-indice.component.css"],
})
export class AddIndiceComponent implements OnInit {

  private idquestion: number;
  private indice: Indice = new Indice();
  private iduser: number;

  constructor(public indicesvc: IndicesService, public route: ActivatedRoute, public router: Router,
              public utilsvc: UtilsService) { }

  public ngOnInit() {
    this.route.params.subscribe((params) => {
      this.idquestion = +this.utilsvc.decrypt(params.idQuestion);
      this.iduser = +localStorage.getItem("userID");
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

  public addIndice(dataForm) {
      dataForm.question = {id_question: this.idquestion };
      this.indicesvc.saveIndice(dataForm)
        .subscribe( (data) => {
          // @ts-ignore
          this.indice = data;
          this.router.navigate(["/questionIndices/", this.utilsvc.crypt(this.idquestion)]);
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
