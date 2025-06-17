import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Movie } from 'generated/prisma';

@Injectable()
export class MovieService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createMovieDto: CreateMovieDto): Promise<Movie> {
    return await this.prisma.movie.create({
      data: createMovieDto,
    });
  }

  async findAll(): Promise<Movie[]> {
    return await this.prisma.movie.findMany();
  }

  async findOne(id: number): Promise<Movie> {
    const movie = await this.prisma.movie.findUnique({
      where: { id },
    });

    if (!movie) {
      throw new NotFoundException('Movie not found 404');
    }

    return movie;
  }

  async update(id: number, updateMovieDto: UpdateMovieDto): Promise<Movie> {
    await this.findOne(id);
    return this.prisma.movie.update({
      where: { id },
      data: updateMovieDto,
    });
  }

  async remove(id: number): Promise<Movie> {
    await this.findOne(id);
    return await this.prisma.movie.delete({
      where: { id },
    });
  }
}
