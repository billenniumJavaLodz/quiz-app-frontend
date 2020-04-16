import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FooterComponent} from './components/footer/footer.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HeaderComponent} from './components/header/header.component';
import {MaterialModule} from './modules/material/material.module'
import {httpInterceptorProviders} from './interceptors/http-interceptor-providers';
import {HomePageComponent} from './components/home-page/home-page.component';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {HttpClientModule} from '@angular/common/http';
import {QuizPageComponent} from './components/quiz-page/quiz-page.component';
import {FormsModule} from '@angular/forms';
import {EndQuizComponent} from './components/end-quiz/end-quiz.component';


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    HomePageComponent,
    PageNotFoundComponent,
    QuizPageComponent,
    EndQuizComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule {
}
