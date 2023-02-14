import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ResponseApi } from '../application/models/ResponseApi';

@Injectable({
  providedIn: 'root',
})

export class MoviesApiService {
  private API_URL = 'https://static.rviewer.io/challenges/datasets/dreadful-cherry-tomatoes/data.json';

  constructor(private http: HttpClient) {}

  getMovies(): Observable<ResponseApi> {
    return this.http
      .get<ResponseApi>(this.API_URL)
      .pipe(catchError((error: any) => throwError(() => error)));
  }
}
