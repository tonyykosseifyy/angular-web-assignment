import { Component, OnInit } from '@angular/core';
import { TmdbService } from '../tmdb.service';

@Component({
  selector: 'app-favorite-actors',
  templateUrl: './favorite-actors.component.html',
  styleUrls: ['./favorite-actors.component.css']
})
export class FavoriteActorsComponent implements OnInit {
  favoriteActors: any[] = [];

  constructor(private tmdbService: TmdbService) {}

  ngOnInit(): void {
    this.favoriteActors = this.tmdbService.getFavoriteActors();
  }

  removeFavorite(actorId: number) {
    this.tmdbService.removeFavoriteActor(actorId);
    this.favoriteActors = this.tmdbService.getFavoriteActors();
  }
}
