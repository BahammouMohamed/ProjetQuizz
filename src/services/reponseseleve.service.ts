import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Reponse} from "../models/models.reponse";
import {ReponseEleve} from "../models/models.reponseeleve";

@Injectable()
export class ReponsesEleveService {

  constructor(public http: HttpClient) {
  }

  public getReponsesEleve() {
    return this.http.get("http://localhost:8080/reponseseleve")
      .map((resp) => resp);
  }

  public getReponseEleveById(id: number) {
    return this.http.get("http://localhost:8080/reponseseleve/" + id)
      .map((resp) => resp);
  }

  public saveReponseEleve(reponseeleve: ReponseEleve) {
    return this.http.post("http://localhost:8080/reponseseleve", reponseeleve)
      .map((resp) => resp);
  }

}
