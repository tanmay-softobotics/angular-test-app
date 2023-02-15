import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MoviesContainerComponent } from './movies-container.component';
import { MoviesApiService } from 'src/app/services/movies-api.service';
import { PaginationComponent } from './pagination/pagination.component';

describe('MoviesContainerComponent', () => {
  let component: MoviesContainerComponent;
  let fixture: ComponentFixture<MoviesContainerComponent>;
  let mockMoviesApiService: jasmine.SpyObj<MoviesApiService>;

  beforeEach(async () => {
    mockMoviesApiService = jasmine.createSpyObj('MoviesApiService', ['getMovies']);
    await TestBed.configureTestingModule({
      declarations: [MoviesContainerComponent, PaginationComponent],
      providers: [{ provide: MoviesApiService, useValue: mockMoviesApiService }]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviesContainerComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    component.ngOnDestroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('expandMovieDetails', () => {
    it('should set expanded to the given index', () => {
      component.expandMovieDetails(1);
      expect(component.expanded).toBe(1);
    });
  });

  describe('collapseMovieDetails', () => {
    it('should set expanded to null', () => {
      component.collapseMovieDetails();
      expect(component.expanded).toBeNull();
    });
  });
});
