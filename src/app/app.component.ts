import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Movie } from './application/models/Movie';
import { MoviesApiService } from './services/movies-api.service';
import { PaginationService } from './services/pagination.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent implements OnInit, OnDestroy {
  public title = 'skeleton-ts-angular';
  private moviesSubscription: Subscription;
  private pageSubscription: Subscription;
  public movies: Movie[] = [];

  constructor(private moviesApiService: MoviesApiService, private paginationService : PaginationService) {
    this.moviesSubscription = new Subscription();
    this.pageSubscription = new Subscription();
  }

  ngOnInit(): void {
    this.moviesSubscription = this.moviesApiService.getMovies().subscribe({
      next: (response) => {
        this.pageSubscription = this.paginationService.currentPage$.subscribe(() => {
          this.movies = this.paginationService.getPagedData(response);    
          console.log(this.movies);
                
        });
      },
      error: (error) => console.error(error),
    });
  }

  ngOnDestroy(): void {
    this.moviesSubscription.unsubscribe();
    this.pageSubscription.unsubscribe();
  }
}

