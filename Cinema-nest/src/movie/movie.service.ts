import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
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

  private validateBase64Image(base64String: string): boolean {
    const base64Regex = /^data:image\/(jpeg|jpg|png|gif|webp);base64,/;
    return base64Regex.test(base64String);
  }

  async create(createMovieDto: CreateMovieDto): Promise<Movie> {
    try {
      if (
        createMovieDto.poster &&
        !this.validateBase64Image(createMovieDto.poster)
      ) {
        throw new Error('Invalid image format');
      }

      return await this.prisma.movie.create({
        data: {
          title: createMovieDto.title,
          genre: createMovieDto.genre,
          description: createMovieDto.description,
          rating: createMovieDto.rating,
          duration: createMovieDto.duration,
          releaseDate: this.parseDate(createMovieDto.releaseDate),
          poster: createMovieDto.poster,
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

    // Validate base64 image if provided
    if (
      updateMovieDto.poster &&
      !this.validateBase64Image(updateMovieDto.poster)
    ) {
      throw new Error('Invalid image format');
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
