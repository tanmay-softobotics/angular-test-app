import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { MoviesContainerComponent } from './ui/movies-container/movies-container.component';
import { NavbarComponent } from './ui/navbar/navbar.component';
import { SearchBarComponent } from './ui/search-bar/search-bar.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
