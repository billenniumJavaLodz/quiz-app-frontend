import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomePageComponent} from './components/home-page/home-page.component';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {QuizPageComponent} from './components/quiz-page/quiz-page.component';


const routes: Routes = [
    {
      path: 'user/:id',
      component: HomePageComponent,
      pathMatch: 'full',

    }, {
      path: 'quiz',
      component: QuizPageComponent,
      pathMatch: 'full',

    }, {
      path: '**',
      component: PageNotFoundComponent,
      pathMatch: 'full'
    }

  ]
;

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
