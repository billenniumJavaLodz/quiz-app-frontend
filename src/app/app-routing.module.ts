import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { QuizPageComponent } from './components/quiz-page/quiz-page.component';
import { EndQuizComponent } from "./components/end-quiz/end-quiz.component";
import { QuestionComponent } from "./components/question/question.component"
import { QuestionDetailsComponent } from './components/question-details/question-details.component';
import { QuestionListComponent } from './components/question-list/question-list.component';
import { QuizListComponent } from './components/quiz-list/quiz-list.component';
import { QuizDetailsComponent } from './components/quiz-details/quiz-details.component';
import { QuestionEditorComponent } from './components/question-editor/question-editor.component';
import { CandidateAddComponent } from './components/candidate-add/candidate-add.component';
import { QuizResultComponent } from './components/quiz-result/quiz-result.component';

const routes: Routes = [

  {
    path: 'candidate/add',
    component: CandidateAddComponent,
    pathMatch: 'full'
  }, {
    path: 'candidate/:id',
    component: HomePageComponent,
    pathMatch: 'full',
  }, {
    path: 'quiz/play',
    component: QuizPageComponent,
    pathMatch: 'full',

  }, {
    path: 'thank-you',
    component: EndQuizComponent,
    pathMatch: 'full'
  }, {
    path: "question/add",
    component: QuestionComponent,
    pathMatch: 'full'
  }, {
    path: "question/:id",
    component: QuestionDetailsComponent,
    pathMatch: 'full'
  }, {
    path: "question",
    component: QuestionListComponent,
    pathMatch: 'full'
  }, {
    path: "quiz",
    component: QuizListComponent,
    pathMatch: 'full'
  }, {
    path: "quiz/add",
    component: QuestionListComponent,
    pathMatch: 'full'
  }, {
    path: "quiz/:id",
    component: QuizDetailsComponent,
    pathMatch: 'full'
  }, {
    path: "question/edit/:id",
    component: QuestionEditorComponent,
    pathMatch: 'full'
  }, {
    path: "quiz/:id/result",
    component: QuizResultComponent,
    pathMatch: 'full'
  }, {
    path: '**',
    component: PageNotFoundComponent,
    pathMatch: 'full'
  }
]
  ;

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
