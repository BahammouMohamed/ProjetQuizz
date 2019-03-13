import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {environment} from "../environments/environment";
import {Indice} from "../models/models.indice";
import { AuthenticationService } from './authentication.service';

@Injectable()
export class IndicesService {

  constructor(public http: HttpClient,public authService:AuthenticationService) {
  }

  public getIndices() {
    return this.http.get(environment.url + "/indices",{headers:new HttpHeaders({'Authorization':this.authService.loadToken()})});
   
  }

  

  public getIndiceById(id: number) {
    return this.http.get(environment.url + "/indices/" + id,{headers:new HttpHeaders({'Authorization':this.authService.loadToken()})});
     
  }

  public saveIndice(indice: Indice) {
    return this.http.post(environment.url + "/indices", indice,{headers:new HttpHeaders({'Authorization':this.authService.loadToken()})});
      
  }

  public updateIndice(indice: Indice) {
    return this.http.put(environment.url + "/indices/" + indice.id_indice, indice,{headers:new HttpHeaders({'Authorization':this.authService.loadToken()})});
  
  }

  public deleteIndice(indiceID: number) {
    return this.http.delete(environment.url + "/indices/" + indiceID,{headers:new HttpHeaders({'Authorization':this.authService.loadToken()})});
      
  }
}
