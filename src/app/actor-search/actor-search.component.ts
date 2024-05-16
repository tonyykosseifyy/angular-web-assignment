import { Component } from '@angular/core';
import { TmdbService } from '../tmdb.service';
import { Actor, Movie } from '../interfaces';

@Component({
  selector: 'app-actor-search',
  templateUrl: './actor-search.component.html',
  styleUrls: ['./actor-search.component.css']
})
export class ActorSearchComponent {
  query: string = '';
  actors: Actor[] = [];

  constructor(private tmdbService: TmdbService) {}

  searchActors() {
    if (this.query) {
      this.tmdbService.searchActors(this.query).subscribe((response) => {
        this.actors = response.results.map((actor: Actor) => {
          actor.knownForTitles = actor.known_for.map((movie: Movie) => movie.title).join(', ');
          return actor;
        });
      });
    }
  }
}
