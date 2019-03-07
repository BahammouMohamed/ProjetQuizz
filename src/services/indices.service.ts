import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {environment} from "../environments/environment";
import {Indice} from "../models/models.indice";

@Injectable()
export class IndicesService {

  constructor(public http: HttpClient) {
  }

  public getIndices() {
    return this.http.get(environment.url + "/indices")
      .map((resp) => resp);
  }

  public getIndiceById(id: number) {
    return this.http.get(environment.url + "/indices/" + id)
      .map((resp) => resp);
  }

  public saveIndice(indice: Indice) {
    return this.http.post(environment.url + "/indices", indice)
      .map((resp) => resp);
  }

  public updateIndice(indice: Indice) {
    return this.http.put(environment.url + "/indices/" + indice.id_indice, indice)
      .map((resp) => resp);
  }

  public deleteIndice(indiceID: number) {
    return this.http.delete(environment.url + "/indices/" + indiceID)
      .map((resp) => resp);
  }
}
