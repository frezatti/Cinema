import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // Adjust path as needed
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie, Prisma } from 'generated/prisma';

@Injectable()
export class MovieService {
  constructor(private readonly prisma: PrismaService) {}

  private parseDate(dateString: string): Date {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      throw new Error(
        'Invalid date format. Please use YYYY-MM-DD or ISO-8601 format.',
      );
    }
    return date;
  }

  async create(createMovieDto: CreateMovieDto): Promise<Movie> {
    try {
      return await this.prisma.movie.create({
        data: {
          title: createMovieDto.title,
          genre: createMovieDto.genre,
          rating: createMovieDto.rating,
          duration: createMovieDto.duration,
          releaseDate: this.parseDate(createMovieDto.releaseDate),
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new Error(`Database error: ${error.message}`);
      }
      throw error;
    }
  }

  async findAll(): Promise<Movie[]> {
    return await this.prisma.movie.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: number): Promise<Movie | null> {
    return await this.prisma.movie.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateMovieDto: UpdateMovieDto): Promise<Movie> {
    const updateData: Prisma.MovieUpdateInput = {
      ...updateMovieDto,
    };

    // Convert releaseDate if provided
    if (updateMovieDto.releaseDate) {
      updateData.releaseDate = this.parseDate(updateMovieDto.releaseDate);
    }

    return await this.prisma.movie.update({
      where: { id },
      data: updateData,
    });
  }

  async remove(id: number): Promise<Movie> {
    return await this.prisma.movie.delete({
      where: { id },
    });
  }
}
