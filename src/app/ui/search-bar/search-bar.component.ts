import { Component, OnInit } from '@angular/core';
import { MoviesApiService } from 'src/app/services/movies-api.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  constructor(private moviesApiService: MoviesApiService) { }

  ngOnInit(): void {
  }

  search(input: string): void {
    this.moviesApiService.search(input);
  }
  
}
