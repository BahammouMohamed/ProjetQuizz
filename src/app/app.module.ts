import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {RouterModule, Routes} from "@angular/router";
import {IndicesService} from "../services/indices.service";
import {QuestionsService} from "../services/questions.service";
import {QuizzsService} from "../services/quizzs.service";
import {UsersService} from "../services/users.service";
import { AboutComponent } from "./about/about.component";
import { AddIndiceComponent } from "./add-indice/add-indice.component";
import { AddQuestionComponent } from "./add-question/add-question.component";
import { AppComponent } from "./app.component";
import { InscriptionComponent } from "./inscription/inscription.component";
import { NewQuizzComponent } from "./new-quizz/new-quizz.component";
import { QuestionIndicesComponent } from "./question-indices/question-indices.component";
import { QuizzQuestionsComponent } from "./quizz-questions/quizz-questions.component";
import { QuizzsComponent } from "./quizzs/quizzs.component";
import { UserQuizzsComponent } from "./user-quizzs/user-quizzs.component";
import { UsersComponent } from "./users/users.component";
import { AddReponseComponent } from './add-reponse/add-reponse.component';
import {ReponsesService} from '../services/reponses.service';
import { QuestionReponsesComponent } from './question-reponses/question-reponses.component';

const appRoutes: Routes = [
  {path :  "about", component : AboutComponent },
  {path :  "users", component : UsersComponent },
  {path :  "inscription", component : InscriptionComponent },
  {path :  "newQuizz", component : NewQuizzComponent },
  {path :  "quizzs", component : QuizzsComponent },
  {path :  "addQuestion/:idQuizz", component : AddQuestionComponent },
  {path :  "userQuizzs/:idUser", component : UserQuizzsComponent },
  {path :  "quizzQuestions/:idQuizz", component : QuizzQuestionsComponent },
  {path :  "addIndice/:idQuestion", component : AddIndiceComponent },
  {path :  "questionIndices/:idQuestion", component : QuestionIndicesComponent },
  {path :  "addReponse/:idQuestion", component : AddReponseComponent },
  {path :  "questionReponses/:idQuestion", component : QuestionReponsesComponent },
  {path :  "", redirectTo : "/users", pathMatch : "full" },

];

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    AboutComponent,
    InscriptionComponent,
    NewQuizzComponent,
    QuizzsComponent,
    AddQuestionComponent,
    UserQuizzsComponent,
    QuizzQuestionsComponent,
    AddIndiceComponent,
    QuestionIndicesComponent,
    AddReponseComponent,
    QuestionReponsesComponent,
  ],
  imports: [
    BrowserModule, RouterModule.forRoot(appRoutes), HttpClientModule, FormsModule,
  ],
  providers: [UsersService, QuizzsService, QuestionsService, IndicesService, ReponsesService],
  bootstrap: [AppComponent],
})
export class AppModule { }
