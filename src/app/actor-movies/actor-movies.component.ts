import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TmdbService } from '../tmdb.service';

@Component({
  selector: 'app-actor-movies',
  templateUrl: './actor-movies.component.html',
  styleUrls: ['./actor-movies.component.css']
})
export class ActorMoviesComponent implements OnInit {
  actorId!: number;
  movies: any[] = [];
  currentPage: number = 1;
  totalPages: number = 1;

  constructor(private route: ActivatedRoute, private tmdbService: TmdbService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.actorId = params['id'];
      this.loadMovies();
    });
  }

  loadMovies() {
    this.tmdbService.getActorMovies(this.actorId).subscribe((response) => {
      this.movies = response.cast;
      this.totalPages = Math.ceil(this.movies.length / 9);
    });
  }

  get paginatedMovies() {
    const startIndex = (this.currentPage - 1) * 9;
    return this.movies.slice(startIndex, startIndex + 9);
  }
  getStarRatingArray(popularity: number, maxPopularity: number = 100): any[] {
    let normalizedPopularity = Math.min(popularity / maxPopularity, 1);
    let starRating = normalizedPopularity * 5;
    starRating = Math.round(starRating * 2) / 2;

    const fullStars = Math.floor(starRating);
    const halfStar = starRating % 1 !== 0 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;

    return [
      ...Array(fullStars).fill('full'),
      ...Array(halfStar).fill('half'),
      ...Array(emptyStars).fill('empty')
    ];
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
}
