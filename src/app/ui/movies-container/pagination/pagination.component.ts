import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PaginationService } from 'src/app/services/pagination.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit, OnDestroy {
  public pages : number[] = [];
  public totalPages : number = 0;
  public currentPage : number = 0;
  public totalPagesSubscription : Subscription;
  public currentPageSubscription : Subscription;

  constructor(private paginationService : PaginationService) { 
    this.totalPagesSubscription = new Subscription();
    this.currentPageSubscription = new Subscription();
  }

  ngOnInit(): void {
    this.totalPagesSubscription = this.paginationService.totalPages$.subscribe((total)=> {
      this.totalPages = total;
      this.pages = Array.from(Array(this.totalPages), (_, i) => i+1);      
    })
    this.currentPageSubscription = this.paginationService.currentPage$.subscribe((page)=> this.currentPage = page);
  }

  goToPage(page: number){
    return this.paginationService.setCurrentPage(page);
  }

  ngOnDestroy(): void {
    this.currentPageSubscription.unsubscribe();
    this.totalPagesSubscription.unsubscribe();
  }
}
