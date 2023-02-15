import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import { ResponseApi } from '../application/models/ResponseApi';
import { Movie } from '../application/models/Movie';
import { PaginationService } from './pagination.service';

@Injectable({
  providedIn: 'root',
})

export class MoviesApiService {
  private API_URL = 'https://static.rviewer.io/challenges/datasets/dreadful-cherry-tomatoes/data.json';
  private moviesSubject = new BehaviorSubject<Movie[]>([]);
  private filterSubject = new BehaviorSubject<string>('');
  private filteredMovies: Movie[] = [];

  movies$ = combineLatest([this.moviesSubject, this.filterSubject]).pipe(
  // combineLatest emits an array of the latest values from each of the source observables
  // In this case, we combine the latest values emitted by the moviesSubject and filterSubject observables
  // and pass them to the map operator as an array
    map(([movies, filter]) =>
    // In the map operator, we first filter the movies array by the given filter string
    // This is done by using the Array.filter method and checking if the movie title includes the filter text
    // We use toLowerCase() to make the comparison case-insensitive
      movies
        .filter((movie) => movie.title.toLowerCase().includes(filter.toLowerCase()))
    ),
    // We then use the tap operator to perform a side effect when the filteredMovies array changes
    tap((filteredMovies) => {
      // Here, we update the filteredMovies array in the service with the new filtered array
      this.filteredMovies = filteredMovies;
      // And set the current page to the first page, since the filtered list has changed
      this.paginationService.setCurrentPage(1);
    }),
      // Finally, we use the switchMap operator to subscribe to the paginationService's currentPage$ observable
    switchMap(() => this.paginationService.currentPage$.pipe(
      // We use the map operator to transform the value emitted by the currentPage$ observable
      // This value is the current page number, and we use it to get the paged data for the filteredMovies array
      map(() => this.paginationService.getPagedData(this.filteredMovies))
    ))
  );

  constructor(private http: HttpClient, private paginationService: PaginationService) {}

  getMovies(): Observable<ResponseApi> {
    return this.http.get<ResponseApi>(this.API_URL).pipe(
      map((response: ResponseApi) => {
        this.moviesSubject.next(response.entries);
        return response;
      }),
      catchError((error: any) => throwError(() => error))
    );
  }

  search(input: string): void {
    this.filterSubject.next(input);
  }
}
