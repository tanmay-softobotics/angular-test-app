export interface PosterArtInterface {
  url: string;
  width: number;
  height: number;
}

export class PosterArt implements PosterArtInterface {
  public url: string;
  public width: number;
  public height: number;

  public constructor(params: PosterArtInterface) {
    this.url = params.url;
    this.width = params.width;
    this.height = params.height;
  }
}
