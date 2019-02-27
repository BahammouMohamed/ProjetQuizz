import {Question} from "./models.question";

export class Reponse {

  public id_reponse: number = null;
  public reponse: string = "";
  public correct: boolean = false;
  public question: Question = null;

}
