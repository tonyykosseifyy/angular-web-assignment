import { Component, OnInit } from '@angular/core';
import { TmdbService } from '../tmdb.service';
import { Actor } from '../interfaces';

@Component({
  selector: 'app-favorite-actors',
  templateUrl: './favorite-actors.component.html',
  styleUrls: ['./favorite-actors.component.css']
})
export class FavoriteActorsComponent implements OnInit {
  favoriteActors: Actor[] = [];

  constructor(private tmdbService: TmdbService) {}

  ngOnInit() {
    this.favoriteActors = this.tmdbService.getFavoriteActors();
  }

  removeFavorite(actor: any) {
    this.tmdbService.removeFavoriteActor(actor.id);
    this.favoriteActors = this.tmdbService.getFavoriteActors(); // Refresh the list
  }

  isFavorite(actorId: number): boolean {
    return this.tmdbService.isFavorite(actorId);
  }
}
