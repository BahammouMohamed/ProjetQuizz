import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {environment} from "../environments/environment";
import {Reponse} from "../models/models.reponse";

@Injectable()
export class ReponsesService {

  constructor(public http: HttpClient) {
  }

  public getReponses() {
    return this.http.get(environment.url + "/reponses")
      .map((resp) => resp);
  }

  public getReponseById(id: number) {
    return this.http.get(environment.url + "/reponses/" + id)
      .map((resp) => resp);
  }

  public saveReponse(reponse: Reponse) {
    return this.http.post(environment.url + "/reponses", reponse)
      .map((resp) => resp);
  }

  public updateReponse(reponse: Reponse) {
    return this.http.put(environment.url + "/reponses/" + reponse.id_reponse, reponse)
      .map((resp) => resp);
  }

  public deleteReponse(idRep: number) {
    return this.http.delete(environment.url + "/reponses/" + idRep)
      .map((resp) => resp);
  }
}
