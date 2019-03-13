import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {environment} from "../environments/environment";
import {Quizz} from "../models/models.quizz";
import { AuthenticationService } from './authentication.service';

@Injectable()
export class QuizzsService {
  constructor(public http: HttpClient, public authService:AuthenticationService) {
  }


  getQuizzs() {
        
        return this.http.get(environment.url+"/quizzs",{headers:new HttpHeaders({'Authorization':this.authService.loadToken()})});
  }

  public getQuizzQuestions(idquizz: number) {
    return this.http.get(environment.url + "/quizzs/" + idquizz + "/questions",{headers:new HttpHeaders({'Authorization':this.authService.loadToken()})});
    ;
  }
  public getQuizzById(idquizz: number) {
    return this.http.get(environment.url + "/quizzs/" + idquizz,{headers:new HttpHeaders({'Authorization':this.authService.loadToken()})} );
   
  }

  public saveQuizz(quizz: Quizz) {
    return this.http.post(environment.url+"/quizzs", quizz,{headers:new HttpHeaders({'Authorization':this.authService.loadToken()})});
    
  }
  

  public updateQuizz(quizz: Quizz) {
    return this.http.put(environment.url + "/quizzs/" + quizz.id_quizz, quizz,{headers:new HttpHeaders({'Authorization':this.authService.loadToken()})});
      
  }

  public  deleteQuizz(idQuizz: number) {
    return this.http.delete(environment.url + "/quizzs/" + idQuizz,{headers:new HttpHeaders({'Authorization':this.authService.loadToken()})});
      
  }
}
