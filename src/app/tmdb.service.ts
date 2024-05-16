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

  getActorMovies(actorId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/person/${actorId}/movie_credits?language=en-US&api_key=${environment.apiKey}`);
  }
}
