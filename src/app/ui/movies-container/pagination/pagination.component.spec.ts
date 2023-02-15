import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginationComponent } from './pagination.component';
import { PaginationService } from 'src/app/services/pagination.service';
import { BehaviorSubject } from 'rxjs';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;
  let paginationService: jasmine.SpyObj<PaginationService>;

  beforeEach(async () => {
    const paginationSpy = jasmine.createSpyObj('PaginationService', ['setCurrentPage'], {
      totalPages$: new BehaviorSubject<number>(5),
      currentPage$: new BehaviorSubject<number>(1)
    });

    await TestBed.configureTestingModule({
      declarations: [ PaginationComponent ],
      providers: [
        { provide: PaginationService, useValue: paginationSpy }
      ]
    })
    .compileComponents();

    paginationService = TestBed.inject(PaginationService) as jasmine.SpyObj<PaginationService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should unsubscribe from subscriptions on destroy', () => {
    spyOn(component.currentPageSubscription, 'unsubscribe');
    spyOn(component.totalPagesSubscription, 'unsubscribe');
    component.ngOnDestroy();
    expect(component.currentPageSubscription.unsubscribe).toHaveBeenCalled();
    expect(component.totalPagesSubscription.unsubscribe).toHaveBeenCalled();
  });
});
