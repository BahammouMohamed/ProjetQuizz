import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {environment} from "../environments/environment";
import {Reponse} from "../models/models.reponse";
import { AuthenticationService } from './authentication.service';

@Injectable()
export class ReponsesService {

  constructor(public http: HttpClient,public authService:AuthenticationService) {
  }

  public getReponses() {
    return this.http.get(environment.url + "/reponses",{headers:new HttpHeaders({'Authorization':this.authService.loadToken()})});
      
  }

  public getReponseById(id: number) {
    return this.http.get(environment.url + "/reponses/" + id,{headers:new HttpHeaders({'Authorization':this.authService.loadToken()})});
     
  }

  public saveReponse(reponse: Reponse) {
    return this.http.post(environment.url + "/reponses", reponse,{headers:new HttpHeaders({'Authorization':this.authService.loadToken()})});
     
  }

  public updateReponse(reponse: Reponse) {
    return this.http.put(environment.url + "/reponses/" + reponse.id_reponse, reponse,{headers:new HttpHeaders({'Authorization':this.authService.loadToken()})});

  }

  public deleteReponse(idRep: number) {
    return this.http.delete(environment.url + "/reponses/" + idRep,{headers:new HttpHeaders({'Authorization':this.authService.loadToken()})});
      
  }
}
