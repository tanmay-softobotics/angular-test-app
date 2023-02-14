import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Movie } from 'src/app/application/models/Movie';

@Component({
  selector: 'app-movies-container',
  templateUrl: './movies-container.component.html',
  styleUrls: ['./movies-container.component.scss']
})
export class MoviesContainerComponent implements OnChanges {

  @Input() movies : Movie[] = [];

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['movies'] && changes['movies'].currentValue) {
      this.movies = changes['movies'].currentValue;
    }
  }

}
