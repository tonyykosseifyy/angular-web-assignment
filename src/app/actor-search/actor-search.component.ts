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
  showModal: boolean = false;
  modalMessage: string = '';
  modalType: string = '';  // Can be 'success' or 'warning'

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
    if (this.tmdbService.isFavorite(actor.id)) {
      this.tmdbService.removeFavoriteActor(actor.id);
      this.showSuccessModal('Removed from favorites', 'warning');
    } else {
      this.tmdbService.addFavoriteActor(actor);
      this.showSuccessModal('Added to favorites', 'success');
    }
  }

  showSuccessModal(message: string, type: string) {
    this.modalMessage = message;
    this.modalType = type;
    this.showModal = true;
    setTimeout(() => {
      this.showModal = false;
    }, 3000);  // Modal will disappear after 3 seconds
  }

  isFavorite(actorId: number): boolean {
    return this.tmdbService.isFavorite(actorId);
  }

  resetSearch() {
    this.query = '';
    this.searchAllActors();
  }
}
