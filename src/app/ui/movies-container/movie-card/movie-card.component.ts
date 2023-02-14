import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Movie } from 'src/app/application/models/Movie';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements  OnChanges {
  @Input() movie ?: Movie;
  public expanded = false;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['movie'] && changes['movie'].currentValue) {
      this.movie = changes['movie'].currentValue;
    }
  }

  expandMovieDetails() {
    this.expanded = true;
  }

  collapseMovieDetails() {
    this.expanded = false;
  }

}
