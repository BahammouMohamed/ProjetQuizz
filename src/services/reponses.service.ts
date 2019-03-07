import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Reponse} from "../models/models.reponse";

@Injectable()
export class ReponsesService {

  constructor(public http: HttpClient) {
  }

  public getReponses() {
    return this.http.get("http://localhost:8080/reponses")
      .map((resp) => resp);
  }

  public getReponseById(id: number) {
    return this.http.get("http://localhost:8080/reponses/" + id)
      .map((resp) => resp);
  }

  public saveReponse(reponse: Reponse) {
    return this.http.post("http://localhost:8080/reponses", reponse)
      .map((resp) => resp);
  }

  public updateReponse(reponse: Reponse) {
    return this.http.put("http://localhost:8080/reponses/" + reponse.id_reponse, reponse)
      .map((resp) => resp);
  }

  public deleteReponse(idRep: number) {
    return this.http.delete("http://localhost:8080/reponses/" + idRep)
      .map((resp) => resp);
  }
}
