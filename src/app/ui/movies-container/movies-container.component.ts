import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { Movie } from 'src/app/application/models/Movie';
import { MoviesApiService } from 'src/app/services/movies-api.service';

@Component({
  selector: 'app-movies-container',
  templateUrl: './movies-container.component.html',
  styleUrls: ['./movies-container.component.scss']
})

export class MoviesContainerComponent implements OnInit {
  private moviesSubscription: Subscription = new Subscription();
  private pagedMoviesSubscription: Subscription = new Subscription();
  public movies : Movie[] = [];

  constructor(private moviesApiService : MoviesApiService) { }

  ngOnInit(): void {
    this.moviesSubscription = this.moviesApiService.getMovies().subscribe({
      next: (response) => response,
      error: (error) => console.error(error),
    });
    this.pagedMoviesSubscription = this.moviesApiService.movies$.subscribe((res)=> this.movies = res)
  }

}
