import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomePageComponent} from './components/home-page/home-page.component';
import {PageNotFoundComponent} from "./components/page-not-found/page-not-found.component";


const routes: Routes = [
  {
    path: 'user/:id',
    component: HomePageComponent,
    pathMatch: 'full',

  }, {
    path: '**',
    component: PageNotFoundComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
