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
import {UtilsService} from "../services/utils.service";
import { AboutComponent } from "./about/about.component";
import { AddIndiceComponent } from "./add-indice/add-indice.component";
import { AddQuestionComponent } from "./add-question/add-question.component";
import { AddReponseComponent } from "./add-reponse/add-reponse.component";
import { AdminDashboardComponent } from "./admin-dashboard/admin-dashboard.component";
import { AppComponent } from "./app.component";
import { CompetitionShowQuestionComponent } from "./competition-show-question/competition-show-question.component";
import { EditIndiceComponent } from "./edit-indice/edit-indice.component";
import { EditQuestionComponent } from "./edit-question/edit-question.component";
import { EditQuizzComponent } from "./edit-quizz/edit-quizz.component";
import { EditReponseComponent } from "./edit-reponse/edit-reponse.component";
import { EditUserComponent } from "./edit-user/edit-user.component";
import { EleveDashboardComponent } from "./eleve-dashboard/eleve-dashboard.component";
import { EnseignantDashboardComponent } from "./enseignant-dashboard/enseignant-dashboard.component";
import { InscriptionComponent } from "./inscription/inscription.component";
import { LoginComponent } from "./login/login.component";
import { NewQuizzComponent } from "./new-quizz/new-quizz.component";
import { QuestionIndicesComponent } from "./question-indices/question-indices.component";
import { QuestionReponsesComponent } from "./question-reponses/question-reponses.component";
import { QuizzListComponent } from "./quizz-list/quizz-list.component";
import { QuizzLoadComponent } from "./quizz-load/quizz-load.component";
import { QuizzQuestionsComponent } from "./quizz-questions/quizz-questions.component";
import { QuizzShowQuestionComponent } from "./quizz-show-question/quizz-show-question.component";
import { QuizzsComponent } from "./quizzs/quizzs.component";
import { ShowQuestionComponent } from "./show-question/show-question.component";
import { UserQuizzsComponent } from "./user-quizzs/user-quizzs.component";
import { UsersComponent } from "./users/users.component";
import { AuthenticationService } from '../services/authentication.service';
import { ErrorComponent } from './error/error.component';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { PageIntrouvableComponent } from './page-introuvable/page-introuvable.component';
import { CompetitionComponent } from './competition/competition.component';
import { SoloComponent } from './solo/solo.component';
import { RevisionQuizzListComponent } from './revision-quizz-list/revision-quizz-list.component';
import { RevisionQuizzDetailsComponent } from './revision-quizz-details/revision-quizz-details.component';
import { AddMediaComponent } from './add-media/add-media.component';
import { QuestionMediasComponent } from './question-medias/question-medias.component';



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
  {path :  "updateUser/:idUser", component : EditUserComponent },
  {path :  "updateQuizz/:idQuizz", component : EditQuizzComponent },
  {path :  "updateIndice/:idIndice", component : EditIndiceComponent },
  {path :  "updateQuestion/:idQuestion", component : EditQuestionComponent },
  {path :  "updateReponse/:idReponse", component : EditReponseComponent },
  {path :  "showQuestion/:idQuestion", component : ShowQuestionComponent },
  {path :  "errorPage", component : ErrorComponent },
  {path :  "accessDenied", component : AccessDeniedComponent},
  {path :  "pageIntrouvable", component : PageIntrouvableComponent},
  {path :  "", redirectTo : "/login", pathMatch : "full" },
  {path :  "competitionShowQuestion/:idQuizz", component : CompetitionShowQuestionComponent },
  {path :  "competition/:idQuizz", component : CompetitionComponent },
  {path :  "revision/:idUser", component : RevisionQuizzListComponent },
  {path :  "revisionQuizzDetails/:idPartie", component : RevisionQuizzDetailsComponent },
  {path :  "solo/:idQuizz", component : SoloComponent },
  {path :  "addMedia/:idQuestion", component : AddMediaComponent },
  {path :  "questionMedias/:idQuestion", component : QuestionMediasComponent },

];

@NgModule({
  bootstrap: [AppComponent],
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
    EditIndiceComponent,
    EditQuizzComponent,
    EditQuestionComponent,
    EditUserComponent,
    EditReponseComponent,
    ShowQuestionComponent,
    ErrorComponent,
    AccessDeniedComponent,
    PageIntrouvableComponent,
    CompetitionShowQuestionComponent,
    CompetitionComponent,
    SoloComponent,
    RevisionQuizzListComponent,
    RevisionQuizzDetailsComponent,
    AddMediaComponent,
    QuestionMediasComponent,
  ],
  imports: [
    BrowserModule, RouterModule.forRoot(appRoutes), HttpClientModule, FormsModule,
  ],
  providers: [UsersService, QuizzsService, QuestionsService, IndicesService, ReponsesService, ReponsesEleveService, UtilsService,AuthenticationService],
})
export class AppModule { }
