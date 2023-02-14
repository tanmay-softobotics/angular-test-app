import { Injectable } from '@angular/core';
import { ResponseApi } from '../application/models/ResponseApi';
import { BehaviorSubject } from 'rxjs';
import { Movie } from '../application/models/Movie';


@Injectable({
  providedIn: 'root',
})
export class PaginationService {
  private currentPageSubject = new BehaviorSubject<number>(1);
  currentPage$ = this.currentPageSubject.asObservable();
  private moviesPerPage = 10;
  private totalPages : number = 0;

  constructor() {}

  setCurrentPage(page: number) {
    this.currentPageSubject.next(page);
  }

  setTotalPages(number : number) {
    this.totalPages = number;
  }

  getTotalPages() : number{
    return this.totalPages;
  }

  getPagedData(responseApi: ResponseApi): Movie[] {
    if(!this.totalPages){
      this.setTotalPages(Math.ceil(responseApi.total / this.moviesPerPage));
    }
    const startIndex = (this.currentPageSubject.value - 1) * this.moviesPerPage;
    const endIndex = startIndex + this.moviesPerPage;
    return responseApi.entries.slice(startIndex, endIndex);
  }

}
