import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {environment} from "../environments/environment";
import {ReponseEleve} from "../models/models.reponseeleve";
import { AuthenticationService } from './authentication.service';

@Injectable()
export class ReponsesEleveService {

  constructor(public http: HttpClient,public authService:AuthenticationService) {
  }

  public getReponsesEleve() {
    return this.http.get(environment.url + "/reponseseleve",{headers:new HttpHeaders({'Authorization':this.authService.loadToken()})});
      
  }

  public getReponseEleveById(id: number) {
    return this.http.get(environment.url + "/reponseseleve/" + id,{headers:new HttpHeaders({'Authorization':this.authService.loadToken()})});
      
  }

  public saveReponseEleve(reponseeleve: ReponseEleve) {
    return this.http.post(environment.url + "/reponseseleve", reponseeleve,{headers:new HttpHeaders({'Authorization':this.authService.loadToken()})});
      
  }

}
