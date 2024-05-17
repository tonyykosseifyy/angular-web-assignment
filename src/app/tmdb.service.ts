import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Actor } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class TmdbService {
  private apiUrl = 'https://api.themoviedb.org/3';

  constructor(private http: HttpClient) {}

  searchActors(query: string): Observable<{ results: Actor[] }> {
    return this.http.get<{ results: Actor[] }>(`${this.apiUrl}/search/person?query=${query}&include_adult=false&language=en-US&page=1&api_key=${environment.apiKey}`);
  }

  searchAllActors(): Observable<{ results: Actor[] }> {
    return this.http.get<{ results: Actor[] }>(`${this.apiUrl}/trending/person/day?api_key=${environment.apiKey}`);
  }

  getActorMovies(actorId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/person/${actorId}/movie_credits?language=en-US&api_key=${environment.apiKey}`);
  }

  getFavoriteActors(): any[] {
    return JSON.parse(localStorage.getItem('favoriteActors') || '[]');
  }

  addFavoriteActor(actor: any) {
    const favorites = this.getFavoriteActors();
    favorites.push(actor);
    localStorage.setItem('favoriteActors', JSON.stringify(favorites));
  }

  removeFavoriteActor(actorId: number) {
    let favorites = this.getFavoriteActors();
    favorites = favorites.filter(actor => actor.id !== actorId);
    localStorage.setItem('favoriteActors', JSON.stringify(favorites));
  }
  isFavorite(actorId: number): boolean {
    const favorites = this.getFavoriteActors();
    return favorites.some(actor => actor.id === actorId);
  }

}
