import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Quizz} from "../models/models.quizz";
import {User} from '../models/models.user';

@Injectable()
export class QuizzsService {
  constructor(public http: HttpClient) {
  }
  public getQuizzs() {
    return this.http.get("http://localhost:8080/quizzs")
      .map((resp) => resp);
  }

  public getQuizzQuestions(idquizz: number) {
    return this.http.get("http://localhost:8080/quizzs/" + idquizz + "/questions")
      .map((resp) => resp);
  }
  public getQuizzById(idquizz: number) {
    return this.http.get("http://localhost:8080/quizzs/" + idquizz )
      .map((resp) => resp);
  }

  public saveQuizz(quizz: Quizz) {
    return this.http.post("http://localhost:8080/quizzs", quizz)
      .map((resp) => resp);
  }

  public updateQuizz(quizz: Quizz) {
    return this.http.put("http://localhost:8080/quizzs/" + quizz.id_quizz, quizz)
      .map((resp) => resp);
  }

  public  deleteQuizz(idQuizz: number) {
    return this.http.delete("http://localhost:8080/quizzs/" + idQuizz)
      .map((resp) => resp);
  }
}
