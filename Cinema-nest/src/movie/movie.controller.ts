import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from 'generated/prisma';

@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Post()
  async create(@Body() createMovieDto: CreateMovieDto): Promise<Movie> {
    try {
      return await this.movieService.create(createMovieDto);
    } catch (error) {
      throw new HttpException(
        `Failed to create movie: ${error}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get()
  async findAll(): Promise<Movie[]> {
    try {
      return await this.movieService.findAll();
    } catch (error) {
      throw new HttpException(
        `Failed to fetch movie: ${error}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Movie> {
    try {
      const movie = await this.movieService.findOne(id);
      if (!movie) {
        throw new HttpException('Movie not found', HttpStatus.NOT_FOUND);
      }
      return movie;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Failed to fetch movie',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMovieDto: UpdateMovieDto,
  ): Promise<Movie> {
    try {
      return await this.movieService.update(id, updateMovieDto);
    } catch (error) {
      throw new HttpException(
        `Failed to update movie: ${error}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<Movie> {
    try {
      return await this.movieService.remove(id);
    } catch (error) {
      throw new HttpException(
        `Failed to delete movie: ${error}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
