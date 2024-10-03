import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from './entities/movies.entity';
import { CreateMovieDto } from './dto/create-movie.dto';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  getMovies(): Movie[] {
    return this.movies;
  }

  getMovie(id: number): Movie {
    const movie = this.movies.find((movie) => movie.id === id);
    if (!movie) {
      throw new NotFoundException('Not found Movie.');
    }
    return movie;
  }

  createMovie(movieData: CreateMovieDto) {
    this.movies.push({
      id: this.movies.length + 1,
      ...movieData,
    });
  }

  deleteMovie(id: number) {
    this.getMovie(id);
    this.movies = this.movies.filter((movie) => movie.id !== id);
  }

  patchMovie(id: number, updateData) {
    const movie = this.getMovie(id);
    
    this.deleteMovie(id)
    this.movies.push({...movie, ...updateData})
    return {
        updatedMovie: id,
        ...updateData,
      }
  }
}
