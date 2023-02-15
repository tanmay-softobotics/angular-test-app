import { Movie } from '../application/models/Movie';
import { PaginationService } from './pagination.service';


describe('PaginationService', () => {
  let service: PaginationService;

  beforeEach(() => {
    service = new PaginationService();
  });

  it('should set the total pages correctly', () => {
    // Arrange
    const movies: Movie[] = [
      {
        title: 'Movie 1',
        description: 'Description 1',
        images: { posterArt: { url: 'http://poster1.jpg', width: 100, height: 200 } },
        releaseYear: 2021,
      },
      {
        title: 'Movie 2',
        description: 'Description 2',
        images: { posterArt: { url: 'http://poster2.jpg', width: 150, height: 250 } },
        releaseYear: 2022,
      },
    ];

    // Act
    service.setTotalPages(1);

    // Assert
    service.totalPages$.subscribe((totalPages) => {
      expect(totalPages).toBe(1);
    });
  });

  it('should return the correct paged data', () => {
    // Arrange
    const movies: Movie[] = [
      {
        title: 'Movie 1',
        description: 'Description 1',
        images: { posterArt: { url: 'http://poster1.jpg', width: 100, height: 200 } },
        releaseYear: 2021,
      },
      {
        title: 'Movie 2',
        description: 'Description 2',
        images: { posterArt: { url: 'http://poster2.jpg', width: 150, height: 250 } },
        releaseYear: 2022,
      },
      {
        title: 'Movie 3',
        description: 'Description 3',
        images: { posterArt: { url: 'http://poster3.jpg', width: 200, height: 300 } },
        releaseYear: 2023,
      },
      {
        title: 'Movie 4',
        description: 'Description 4',
        images: { posterArt: { url: 'http://poster4.jpg', width: 250, height: 350 } },
        releaseYear: 2024,
      },
      {
        title: 'Movie 5',
        description: 'Description 5',
        images: { posterArt: { url: 'http://poster5.jpg', width: 300, height: 400 } },
        releaseYear: 2025,
      },
      {
        title: 'Movie 6',
        description: 'Description 6',
        images: { posterArt: { url: 'http://poster6.jpg', width: 350, height: 450 } },
        releaseYear: 2026,
      },
      {
        title: 'Movie 7',
        description: 'Description 7',
        images: { posterArt: { url: 'http://poster7.jpg', width: 350, height: 450 } },
        releaseYear: 2026,
      },{
        title: 'Movie 8',
        description: 'Description 8',
        images: { posterArt: { url: 'http://poster8.jpg', width: 350, height: 450 } },
        releaseYear: 2026,
      },
      {
        title: 'Movie 9',
        description: 'Description 9',
        images: { posterArt: { url: 'http://poster9.jpg', width: 350, height: 450 } },
        releaseYear: 2026,
      },
      {
        title: 'Movie 10',
        description: 'Description 10',
        images: { posterArt: { url: 'http://poster10.jpg', width: 350, height: 450 } },
        releaseYear: 2026,
      },
      {
        title: 'Movie 11',
        description: 'Description 11',
        images: { posterArt: { url: 'http://poster11.jpg', width: 350, height: 450 } },
        releaseYear: 2026,
      },
    ];

    service.setCurrentPage(1);

    // Act
    const result = service.getPagedData(movies);

    // Assert
    expect(result.length).toBe(10);
    expect(result[0].title).toBe('Movie 1');
    expect(result[1].title).toBe('Movie 2');

    service.setCurrentPage(2);
    // Act
    const resultPage2 = service.getPagedData(movies);    

    // Assert
    expect(resultPage2.length).toBe(1);
    expect(resultPage2[0].title).toBe('Movie 11');
  });
});
