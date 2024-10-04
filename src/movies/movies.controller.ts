import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './entities/movies.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesServers: MoviesService) {}

  @Get()
  getMovies(): Movie[] {
    return this.moviesServers.getMovies();
  }

  @Get('/:id')
  getMovie(@Param('id') movieId: number) {
    return this.moviesServers.getMovie(movieId);
  }

  @Post()
  createMovie(@Body() movieData: CreateMovieDto) {
    return this.moviesServers.createMovie(movieData);
  }

  @Delete('/:id')
  deleteMovie(@Param('id') movieId: number) {
    return this.moviesServers.deleteMovie(movieId);
  }

  @Patch('/:id')
  patchMovie(@Param('id') movieId: number, @Body() updateData: UpdateMovieDto) {
    return this.moviesServers.patchMovie(movieId, updateData);
  }
}
