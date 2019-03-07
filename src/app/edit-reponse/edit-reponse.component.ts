import { Component, OnInit } from "@angular/core";
import {ActivatedRoute} from "@angular/router";
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
  constructor(public reponseesvc: ReponsesService, public route: ActivatedRoute, public utilsvc: UtilsService) {
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
        }, (err) => {
          console.log(JSON.parse(err._body).message);
        });
    }, (err) => {
      console.log(JSON.parse(err._body).message);
    });
  }

  public editReponse() {
    console.log("UPDATE REPONSE : " + this.reponse.id_reponse);
    this.reponseesvc.updateReponse(this.reponse)
      .subscribe( (data) => {
        // @ts-ignore
        this.reponse = data;
        this.mode = 2;
      }, (err) => {
        alert(err.error.message);
        console.log(err);
      });
  }

}
