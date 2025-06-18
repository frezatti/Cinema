import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Session } from 'generated/prisma';
import { format } from 'path';

@Injectable()
export class SessionService {
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

  async create(createSessionDto: CreateSessionDto): Promise<Session> {
    await this.prisma.movie.findUniqueOrThrow({
      where: { id: createSessionDto.movieId },
    });
    await this.prisma.theater.findUniqueOrThrow({
      where: { id: createSessionDto.theaterId },
    });

    return this.prisma.session.create({
      data: {
        dateTime: createSessionDto.dateTime,
        price: createSessionDto.price,
        format: createSessionDto.format,
        language: createSessionDto.language,
        theaterId: createSessionDto.theaterId,
        movieId: createSessionDto.movieId,
      },
    });
  }

  findAll(): Promise<Session[]> {
    return this.prisma.session.findMany({
      include: {
        movie: true,
        theater: true,
      },
    });
  }

  async findOne(id: number): Promise<Session> {
    const session = await this.prisma.session.findUnique({
      where: { id },
      include: {
        movie: true,
        theater: true,
      },
    });

    if (!session) {
      throw new NotFoundException(`Session with ID #${id} not found`);
    }

    return session;
  }

  async update(
    id: number,
    updateSessionDto: UpdateSessionDto,
  ): Promise<Session> {
    await this.findOne(id);

    if (updateSessionDto.movieId) {
      await this.prisma.movie.findUniqueOrThrow({
        where: { id: updateSessionDto.movieId },
      });
    }
    if (updateSessionDto.theaterId) {
      await this.prisma.theater.findUniqueOrThrow({
        where: { id: updateSessionDto.theaterId },
      });
    }

    return this.prisma.session.update({
      where: { id },
      data: updateSessionDto,
    });
  }

  async remove(id: number): Promise<Session> {
    // First, ensure the session exists before trying to delete it
    await this.findOne(id);

    return this.prisma.session.delete({
      where: { id },
    });
  }
}
