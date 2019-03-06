import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Indice} from "../models/models.indice";

@Injectable()
export class IndicesService {

  constructor(public http: HttpClient) {
  }

  public getIndices() {
    return this.http.get("http://localhost:8080/indices")
      .map((resp) => resp);
  }

  public getIndiceById(id: number) {
    return this.http.get("http://localhost:8080/indices/" + id)
      .map((resp) => resp);
  }

  public saveIndice(indice: Indice) {
    return this.http.post("http://localhost:8080/indices", indice)
      .map((resp) => resp);
  }

  public updateIndice(indice: Indice) {
    return this.http.put("http://localhost:8080/indices/" + indice.id_indice, indice)
      .map((resp) => resp);
  }
}
