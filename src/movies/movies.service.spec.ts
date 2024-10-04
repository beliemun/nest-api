import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { NotFoundException } from '@nestjs/common';
import { title } from 'process';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return an array', () => {});

  describe('getMovies', () => {
    it('should return an array', () => {
      const result = service.getMovies();
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('getOne', () => {
    it('should return a movie', () => {
      service.createMovie({
        title: 'Iron Man',
        year: 2005,
        genres: ['Action'],
      });
      const movie = service.getMovie(1);
      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);
    });
    it('should throw 404 Error', () => {
      try {
        service.getMovie(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual('Not found Movie.');
      }
    });
  });

  describe('deleteMovie', () => {
    it('deletes a movie', () => {
      service.createMovie({
        title: 'Iron Man',
        year: 2005,
        genres: ['Action'],
      });
      const movies = service.getMovies();
      service.deleteMovie(1);
      const afterDelete = service.getMovies();
      expect(afterDelete.length).toBeLessThan(movies.length);
    });

    it('should throw a NotFoundException', () => {
      try {
        service.deleteMovie(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('create', () => {
    it('should create a movie', () => {
      service.createMovie({
        title: 'Iron Man',
        year: 2005,
        genres: ['Action'],
      });
      const movies = service.getMovies();
      const title = movies[movies.length - 1].title;
      expect(title).toEqual('Iron Man');
    });
  });

  describe('patchMovie', () => {
    it('should update a movie', () => {
      service.createMovie({
        title: 'Iron Man',
        year: 2005,
        genres: ['Action'],
      });

      service.patchMovie(1, { title: 'Super Man' });
      const movie = service.getMovie(1);
      expect(movie.title).toEqual('Super Man');
    });

    it('should throw a NotFoundException', () => {
      service.createMovie({
        title: 'Iron Man',
        year: 2005,
        genres: ['Action'],
      });

      try {
        service.patchMovie(999, { title: '' });
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
