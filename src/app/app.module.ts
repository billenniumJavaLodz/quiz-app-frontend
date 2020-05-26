import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { MaterialModule } from './modules/material/material.module'
import { httpInterceptorProviders } from './interceptors/http-interceptor-providers';
import { HomePageComponent } from './components/home-page/home-page.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HttpClientModule } from '@angular/common/http';
import { QuizPageComponent } from './components/quiz-page/quiz-page.component';
import { FormsModule } from '@angular/forms';
import { EndQuizComponent } from './components/end-quiz/end-quiz.component';
import { QuestionComponent } from './components/question/question.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { QuestionDetailsComponent } from './components/question-details/question-details.component';
import { LoaderComponent } from './components/loader/loader.component';
import { QuestionListComponent } from './components/question-list/question-list.component';
import { QuizListComponent } from './components/quiz-list/quiz-list.component';
import { PageNavigationComponent } from './components/page-navigation/page-navigation.component';
import { QuizDetailsComponent } from './components/quiz-details/quiz-details.component';
import { QuestionFormComponent } from './components/question-form/question-form.component';
import { QuestionEditorComponent } from './components/question-editor/question-editor.component';
import { QuizListPanelComponent } from './components/quiz-list-panel/quiz-list-panel.component';
import { CandidateAddComponent } from './components/candidate-add/candidate-add.component';
import { QuizResultComponent } from './components/quiz-result/quiz-result.component';
import { CategoryListComponent } from './components/category-list/category-list.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    HomePageComponent,
    PageNotFoundComponent,
    QuizPageComponent,
    EndQuizComponent,
    QuestionComponent,
    QuestionDetailsComponent,
    LoaderComponent,
    QuestionListComponent,
    QuizListComponent,
    PageNavigationComponent,
    QuizDetailsComponent,
    QuestionFormComponent,
    QuestionEditorComponent,
    QuizListPanelComponent,
    CandidateAddComponent,
    QuizResultComponent,
    CategoryListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CKEditorModule
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule {
}
