import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Question} from "../models/models.question";

@Injectable()
export class QuestionsService {
  constructor(public http: HttpClient) {
  }
  public getQuestions() {
    return this.http.get("http://localhost:8080/questions")
      .map((resp) => resp);
  }

  public getQuestionIndices(idquestion: number) {
    return this.http.get("http://localhost:8080/questions/" + idquestion + "/indices")
      .map((resp) => resp);
  }

  public getQuestionMedias(idquestion: number) {
    return this.http.get("http://localhost:8080/questions/" + idquestion + "/medias")
      .map((resp) => resp);
  }

  public getQuestionById(id: number) {
    return this.http.get("http://localhost:8080/questions/" + id )
      .map((resp) => resp);
  }

  public saveQuestion(question: Question) {
    return this.http.post("http://localhost:8080/questions", question)
      .map((resp) => resp);
  }

}
