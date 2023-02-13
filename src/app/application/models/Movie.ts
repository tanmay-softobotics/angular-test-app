import { PosterArt } from './PosterArt';

export interface MovieInterface {
  title: string;
  description: string;
  images: { posterArt: PosterArt };
  releaseYear: number;
}

export class Movie implements MovieInterface {
  public title: string;
  public description: string;
  public images: { posterArt: PosterArt };
  public releaseYear: number = 0;

  public constructor(params: MovieInterface) {
    this.title = params.title;
    this.description = params.description;
    this.images = params.images;
    this.releaseYear = params.releaseYear;
  }
}
