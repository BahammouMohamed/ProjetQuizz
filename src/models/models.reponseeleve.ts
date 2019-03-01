import {Question} from "./models.question";
import {User} from "./models.user";

export class ReponseEleve {

  public id_reponse_eleve: number = null;
  public reponse_eleve: string = "";
  public user: User = null;
  public question: Question = null;

}
