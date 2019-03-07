import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {environment} from "../environments/environment";
import {Question} from "../models/models.question";

@Injectable()
export class QuestionsService {
  constructor(public http: HttpClient) {
  }
  public getQuestions() {
    return this.http.get(environment.url + "/questions")
      .map((resp) => resp);
  }

  public getQuestionIndices(idquestion: number) {
    return this.http.get(environment.url + "/questions/" + idquestion + "/indices")
      .map((resp) => resp);
  }

  public getQuestionMedias(idquestion: number) {
    return this.http.get(environment.url + "/questions/" + idquestion + "/medias")
      .map((resp) => resp);
  }

  public getQuestionReponses(idquestion: number) {
    return this.http.get(environment.url + "/questions/" + idquestion + "/reponses")
      .map((resp) => resp);
  }

  public getQuestionById(id: number) {
    return this.http.get(environment.url + "/questions/" + id )
      .map((resp) => resp);
  }

  public saveQuestion(question: Question) {
    return this.http.post(environment.url + "/questions", question)
      .map((resp) => resp);
  }

  public updateQuestion(question: Question) {
    return this.http.put(environment.url + "/questions/" + question.id_question, question)
      .map((resp) => resp);
  }

  public  deleteQuestion(idQuest: number) {
    return this.http.delete(environment.url + "/questions/" + idQuest)
      .map((resp) => resp);
  }
}
