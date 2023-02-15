import { Movie } from './Movie';

export interface ResponseApiInterface {
  total: number;
  entries: Movie[];
}

export class ResponseApi implements ResponseApiInterface {
  public total: number;
  public entries: Movie[];

  public constructor(params: ResponseApiInterface) {
    this.total = params.total;
    this.entries = params.entries;
  }
}
