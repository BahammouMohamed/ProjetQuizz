import { Component, OnInit } from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {Reponse} from "../../models/models.reponse";
import {ReponsesService} from "../../services/reponses.service";
import {UtilsService} from "../../services/utils.service";

@Component({
  selector: "app-add-reponse",
  styleUrls: ["./add-reponse.component.css"],
  templateUrl: "./add-reponse.component.html",
})
export class AddReponseComponent implements OnInit {

  private idquestion: number;
  private reponse: Reponse = new Reponse();

  constructor(public reponsesvc: ReponsesService, public route: ActivatedRoute, public router: Router,
              public utilsvc: UtilsService) { }

  public ngOnInit() {
  }

  public addReponse(dataForm) {
    // Ici récupérer l'id de la Question et l'injecter dans l'objet JSON de la Reponse
    this.route.params.subscribe((params) => {
      this.idquestion = +this.utilsvc.decrypt(params.idQuestion); // (+) converts string 'id' to a number
      dataForm.question = {id_question: this.idquestion };
      this.reponsesvc.saveReponse(dataForm)
        .subscribe( (data) => {
          // @ts-ignore
          this.reponse = data;
          console.log(data);
          this.router.navigate(["/questionReponses/", this.utilsvc.crypt(this.idquestion)]);
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
