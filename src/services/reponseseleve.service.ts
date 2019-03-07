import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {environment} from "../environments/environment";
import {ReponseEleve} from "../models/models.reponseeleve";

@Injectable()
export class ReponsesEleveService {

  constructor(public http: HttpClient) {
  }

  public getReponsesEleve() {
    return this.http.get(environment.url + "/reponseseleve")
      .map((resp) => resp);
  }

  public getReponseEleveById(id: number) {
    return this.http.get(environment.url + "/reponseseleve/" + id)
      .map((resp) => resp);
  }

  public saveReponseEleve(reponseeleve: ReponseEleve) {
    return this.http.post(environment.url + "/reponseseleve", reponseeleve)
      .map((resp) => resp);
  }

}
