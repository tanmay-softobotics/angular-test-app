import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Movie } from './application/models/Movie';
import { MoviesApiService } from './services/movies-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  public title = 'skeleton-ts-angular';
  private subscription: Subscription;
  public movies : Movie[] = [];

  constructor(private moviesApi: MoviesApiService) {
    this.subscription = new Subscription();
  }

  ngOnInit(): void {
    this.subscription = this.moviesApi.getMovies().subscribe({
      next: (response) => {
        this.movies = response.entries;
      },
      error: (error) => console.error(error),
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

