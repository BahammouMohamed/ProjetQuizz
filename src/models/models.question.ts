import {Quizz} from "./models.quizz";

export class Question {

  public id_question: number = null;
  public question: string = "";
  public type: string = "";
  public points: string = "";
  public quizz: Quizz = null;

}
