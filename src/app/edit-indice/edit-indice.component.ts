import { Component, OnInit } from "@angular/core";
import {ActivatedRoute} from "@angular/router";
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
  constructor(public indicesvc: IndicesService, public route: ActivatedRoute, public utilsvc: UtilsService) {
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
        }, (err) => {
          console.log(JSON.parse(err._body).message);
        });
    }, (err) => {
      console.log(JSON.parse(err._body).message);
    });
  }

  public editIndice() {
    console.log("UPDATE INDICE : " + this.indice.id_indice);
    this.indicesvc.updateIndice(this.indice)
      .subscribe( (data) => {
        // @ts-ignore
        this.indice = data;
        this.mode = 2;
      }, (err) => {
        alert(err.error.message);
        console.log(err);
      });
  }

}
