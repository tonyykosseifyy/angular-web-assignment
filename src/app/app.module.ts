import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { ActorSearchComponent } from './actor-search/actor-search.component';
// import { ActorMoviesComponent } from './actor-movies/actor-movies.component';
// import { FavoriteActorsComponent } from './favorite-actors/favorite-actors.component';

const routes: Routes = [
  { path: '', component: ActorSearchComponent },
  // { path: 'actor/:id', component: ActorMoviesComponent },
  // { path: 'favorites', component: FavoriteActorsComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    ActorSearchComponent,
    // ActorMoviesComponent,
    // FavoriteActorsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
