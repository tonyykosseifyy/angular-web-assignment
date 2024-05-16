import { Component, OnInit } from '@angular/core';
import { TmdbService } from '../tmdb.service';
import { Actor, Movie } from '../interfaces';

@Component({
  selector: 'app-actor-search',
  templateUrl: './actor-search.component.html',
  styleUrls: ['./actor-search.component.css']
})
export class ActorSearchComponent implements OnInit {
  query: string = '';  // The query can be set dynamically based on user input
  actors: Actor[] = [];

  constructor(private tmdbService: TmdbService) {}

  ngOnInit() {
    this.searchAllActors();  // Call searchAllActors on component initialization
  }

  searchActors(query: string) {
    if (query) {
      this.tmdbService.searchActors(query).subscribe((response) => {
        this.actors = response.results.map((actor: Actor) => {
          actor.knownForTitles = actor.known_for.map((movie: Movie) => movie.title).join(', ');
          return actor;
        });
      });
    }
  }

  searchAllActors() {
    this.tmdbService.searchAllActors().subscribe((response) => {
      this.actors = response.results.map((actor: Actor) => {
        actor.knownForTitles = actor.known_for.map((movie: Movie) => movie.title).join(', ');
        return actor;
      });
    });
  }

  addFavorite(actor: any) {
    this.tmdbService.addFavoriteActor(actor);
  }

  // removeFavorite(actorId: number) {
  //   this.tmdbService.removeFavoriteActor(actorId);
  // }
}
