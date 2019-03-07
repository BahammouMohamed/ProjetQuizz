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
        }, (err) => {
          console.log(JSON.parse(err._body).message);
        });
    }, (err) => {
      console.log(JSON.parse(err._body).message);
    });
  }

}
