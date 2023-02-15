import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MoviesApiService } from './movies-api.service';
import { PaginationService } from './pagination.service';

describe('MoviesApiService', () => {
  let moviesApiService: MoviesApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MoviesApiService, PaginationService],
    });

    moviesApiService = TestBed.inject(MoviesApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(moviesApiService).toBeTruthy();
  });

  describe('getMovies', () => {
    it('should fetch movies and update the movies subject', () => {
      const mockResponse = {
        total: 2,
        entries: [
          { title: 'Movie 1', description : 'description 1', releaseYear: 2000, images:{ posterArt : {url : 'https://google.com', width : 220, height: 500}}},
          { title: 'Movie 2', description : 'description 2', releaseYear: 2000, images:{ posterArt : {url : 'https://google.com', width : 220, height: 500}} },
        ]
      };

      moviesApiService.getMovies().subscribe((response) => {
        expect(response).toEqual(mockResponse);
      });

      const request = httpMock.expectOne(moviesApiService['API_URL']);
      expect(request.request.method).toEqual('GET');
      request.flush(mockResponse);

      expect(moviesApiService['moviesSubject'].getValue()).toEqual(mockResponse.entries);
    });

    it('should throw an error if the request fails', () => {
      const mockError = { status: 404, statusText: 'Not Found' };

      moviesApiService.getMovies().subscribe(
        (response) => {
          fail('Expected an error to be thrown');
        },
        (error) => {
          expect(error.status).toEqual(mockError.status);
          expect(error.statusText).toEqual(mockError.statusText);
        }
      );

      const request = httpMock.expectOne(moviesApiService['API_URL']);
      expect(request.request.method).toEqual('GET');
      request.flush(null, mockError);
    });
  });

  describe('search', () => {
    it('should update the filter subject', () => {
      moviesApiService.search('Movie 1');

      expect(moviesApiService['filterSubject'].getValue()).toEqual('Movie 1');
    });
  });
});
