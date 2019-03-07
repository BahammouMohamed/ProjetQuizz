import { Component, OnInit } from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {Indice} from "../../models/models.indice";
import {IndicesService} from "../../services/indices.service";

@Component({
  selector: "app-add-indice",
  templateUrl: "./add-indice.component.html",
  styleUrls: ["./add-indice.component.css"],
})
export class AddIndiceComponent implements OnInit {

  private idquestion: number;
  private indice: Indice = new Indice();

  constructor(public indicesvc: IndicesService, public route: ActivatedRoute, public router: Router) { }

  public ngOnInit() {
  }

  public addIndice(dataForm) {
    // Ici récupérer l'id de la Question et l'injecter dans l'objet JSON de l'Indice
    this.route.params.subscribe((params) => {
      this.idquestion = +params.idQuestion; // (+) converts string 'id' to a number
      console.log(this.idquestion);
      dataForm.question = {id_question: this.idquestion };
      this.indicesvc.saveIndice(dataForm)
        .subscribe( (data) => {
          // @ts-ignore
          this.indice = data;
          console.log(data);
          this.router.navigate(["/questionIndices/", this.idquestion]);
        }, (err) => {
          console.log(JSON.parse(err._body).message);
        });
    }, (err) => {
      console.log(JSON.parse(err._body).message);
    });
  }
}
