import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {environment} from "../environments/environment";
import {Question} from "../models/models.question";
import { AuthenticationService } from './authentication.service';

@Injectable()
export class QuestionsService {
  constructor(public http: HttpClient , public authService:AuthenticationService) {
  }
  public getQuestions() {
    return this.http.get(environment.url + "/questions",{headers:new HttpHeaders({'Authorization':this.authService.loadToken()})});
      
  }

  public getQuestionIndices(idquestion: number) {
    return this.http.get(environment.url + "/questions/" + idquestion + "/indices",{headers:new HttpHeaders({'Authorization':this.authService.loadToken()})});
    
  }

  public getQuestionMedias(idquestion: number) {
    return this.http.get(environment.url + "/questions/" + idquestion + "/medias",{headers:new HttpHeaders({'Authorization':this.authService.loadToken()})});
      
  }

  public getQuestionReponses(idquestion: number) {
    return this.http.get(environment.url + "/questions/" + idquestion + "/reponses",{headers:new HttpHeaders({'Authorization':this.authService.loadToken()})});
 
  }

  public getQuestionById(id: number) {
    return this.http.get(environment.url + "/questions/" + id,{headers:new HttpHeaders({'Authorization':this.authService.loadToken()})} );
     
  }

  public saveQuestion(question: Question) {
    return this.http.post(environment.url + "/questions", question,{headers:new HttpHeaders({'Authorization':this.authService.loadToken()})});
      
  }

  public updateQuestion(question: Question) {
    return this.http.put(environment.url + "/questions/" + question.id_question, question,{headers:new HttpHeaders({'Authorization':this.authService.loadToken()})});
      
  }

  public  deleteQuestion(idQuest: number) {
    return this.http.delete(environment.url + "/questions/" + idQuest,{headers:new HttpHeaders({'Authorization':this.authService.loadToken()})});

  }
}
