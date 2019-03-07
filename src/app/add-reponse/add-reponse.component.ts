import { Component, OnInit } from '@angular/core';
import {Indice} from '../../models/models.indice';
import {IndicesService} from '../../services/indices.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ReponsesService} from '../../services/reponses.service';
import {Reponse} from '../../models/models.reponse';

@Component({
  selector: 'app-add-reponse',
  templateUrl: './add-reponse.component.html',
  styleUrls: ['./add-reponse.component.css']
})
export class AddReponseComponent implements OnInit {

  private idquestion: number;
  private reponse: Reponse = new Reponse();

  constructor(public reponsesvc: ReponsesService, public route: ActivatedRoute, public router: Router) { }

  public ngOnInit() {
  }

  public addReponse(dataForm) {
    // Ici récupérer l'id de la Question et l'injecter dans l'objet JSON de la Reponse
    this.route.params.subscribe((params) => {
      this.idquestion = +params.idQuestion; // (+) converts string 'id' to a number
      dataForm.question = {id_question: this.idquestion };
      this.reponsesvc.saveReponse(dataForm)
        .subscribe( (data) => {
          // @ts-ignore
          this.reponse = data;
          console.log(data);
          this.router.navigate(["/questionReponses/", this.idquestion]);
        }, (err) => {
          console.log(JSON.parse(err._body).message);
        });
    }, (err) => {
      console.log(JSON.parse(err._body).message);
    });
  }

}
