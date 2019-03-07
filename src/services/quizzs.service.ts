import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {environment} from "../environments/environment";
import {Quizz} from "../models/models.quizz";

@Injectable()
export class QuizzsService {
  constructor(public http: HttpClient) {
  }
  public getQuizzs() {
    return this.http.get(environment.url + "/quizzs")
      .map((resp) => resp);
  }

  public getQuizzQuestions(idquizz: number) {
    return this.http.get(environment.url + "/quizzs/" + idquizz + "/questions")
      .map((resp) => resp);
  }
  public getQuizzById(idquizz: number) {
    return this.http.get(environment.url + "/quizzs/" + idquizz )
      .map((resp) => resp);
  }

  public saveQuizz(quizz: Quizz) {
    return this.http.post(environment.url + "/quizzs", quizz)
      .map((resp) => resp);
  }

  public updateQuizz(quizz: Quizz) {
    return this.http.put(environment.url + "/quizzs/" + quizz.id_quizz, quizz)
      .map((resp) => resp);
  }

  public  deleteQuizz(idQuizz: number) {
    return this.http.delete(environment.url + "/quizzs/" + idQuizz)
      .map((resp) => resp);
  }
}
