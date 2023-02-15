import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SearchBarComponent } from './search-bar.component';
import { MoviesApiService } from 'src/app/services/movies-api.service';

describe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;
  let moviesApiService: jasmine.SpyObj<MoviesApiService>;

  beforeEach(async () => {
    const moviesApiServiceSpy = jasmine.createSpyObj('MoviesApiService', ['search']);

    await TestBed.configureTestingModule({
      declarations: [ SearchBarComponent ],
      providers: [
        { provide: MoviesApiService, useValue: moviesApiServiceSpy },
      ]
    })
    .compileComponents();

    moviesApiService = TestBed.inject(MoviesApiService) as jasmine.SpyObj<MoviesApiService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call moviesApiService.search with input string', () => {
    const input = 'test input';
    const inputElement = fixture.debugElement.query(By.css('input'));
    inputElement.nativeElement.value = input;
    inputElement.triggerEventHandler('input', { target: inputElement.nativeElement });
    expect(moviesApiService.search).toHaveBeenCalledWith(input);
  });
});
