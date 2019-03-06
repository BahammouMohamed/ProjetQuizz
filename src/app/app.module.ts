import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {RouterModule, Routes} from "@angular/router";
import {IndicesService} from "../services/indices.service";
import {QuestionsService} from "../services/questions.service";
import {QuizzsService} from "../services/quizzs.service";
import {ReponsesService} from "../services/reponses.service";
import {ReponsesEleveService} from "../services/reponseseleve.service";
import {UsersService} from "../services/users.service";
import { AboutComponent } from "./about/about.component";
import { AddIndiceComponent } from "./add-indice/add-indice.component";
import { AddQuestionComponent } from "./add-question/add-question.component";
import { AddReponseComponent } from "./add-reponse/add-reponse.component";
import { AdminDashboardComponent } from "./admin-dashboard/admin-dashboard.component";
import { AppComponent } from "./app.component";
import { EleveDashboardComponent } from "./eleve-dashboard/eleve-dashboard.component";
import { EnseignantDashboardComponent } from "./enseignant-dashboard/enseignant-dashboard.component";
import { InscriptionComponent } from "./inscription/inscription.component";
import { NewQuizzComponent } from "./new-quizz/new-quizz.component";
import { QuestionIndicesComponent } from "./question-indices/question-indices.component";
import { QuestionReponsesComponent } from "./question-reponses/question-reponses.component";
import { QuizzListComponent } from "./quizz-list/quizz-list.component";
import { QuizzLoadComponent } from "./quizz-load/quizz-load.component";
import { QuizzQuestionsComponent } from "./quizz-questions/quizz-questions.component";
import { QuizzShowQuestionComponent } from "./quizz-show-question/quizz-show-question.component";
import { QuizzsComponent } from "./quizzs/quizzs.component";
import { UserQuizzsComponent } from "./user-quizzs/user-quizzs.component";
import { UsersComponent } from "./users/users.component";
import { LoginComponent } from './login/login.component';

const appRoutes: Routes = [
  {path :  "login", component : LoginComponent },
  {path :  "about", component : AboutComponent },
  {path :  "users", component : UsersComponent },
  {path :  "inscription", component : InscriptionComponent },
  {path :  "newQuizz/:idUser", component : NewQuizzComponent },
  {path :  "quizzs", component : QuizzsComponent },
  {path :  "addQuestion/:idQuizz", component : AddQuestionComponent },
  {path :  "userQuizzs/:idUser", component : UserQuizzsComponent },
  {path :  "quizzQuestions/:idQuizz", component : QuizzQuestionsComponent },
  {path :  "addIndice/:idQuestion", component : AddIndiceComponent },
  {path :  "questionIndices/:idQuestion", component : QuestionIndicesComponent },
  {path :  "addReponse/:idQuestion", component : AddReponseComponent },
  {path :  "questionReponses/:idQuestion", component : QuestionReponsesComponent },
  {path :  "showQuizzQuestion/:idQuizz/:idQuestion", component : QuizzShowQuestionComponent },
  {path :  "quizzLoad/:idQuizz", component : QuizzLoadComponent },
  {path :  "listQuizzs/:idUser", component : QuizzListComponent },
  {path :  "adminDashboard", component : AdminDashboardComponent },
  {path :  "eleveDashboard", component : EleveDashboardComponent },
  {path :  "enseignantDashboard", component : EnseignantDashboardComponent },
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
    QuizzShowQuestionComponent,
    QuizzListComponent,
    QuizzLoadComponent,
    AdminDashboardComponent,
    EnseignantDashboardComponent,
    EleveDashboardComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule, RouterModule.forRoot(appRoutes), HttpClientModule, FormsModule,
  ],
  providers: [UsersService, QuizzsService, QuestionsService, IndicesService, ReponsesService, ReponsesEleveService],
  bootstrap: [AppComponent],
})
export class AppModule { }
