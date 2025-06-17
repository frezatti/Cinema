import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Session } from 'generated/prisma';

@Injectable()
export class SessionService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createSessionDto: CreateSessionDto): Promise<Session> {
    // Verify if the related movie and theater exist before creating the session
    await this.prisma.movie.findUniqueOrThrow({
      where: { id: createSessionDto.movieId },
    });
    await this.prisma.theater.findUniqueOrThrow({
      where: { id: createSessionDto.theaterId },
    });

    return this.prisma.session.create({
      data: createSessionDto,
    });
  }

  findAll(): Promise<Session[]> {
    // Include the related movie and theater data in the response
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
    // First, ensure the session we want to update exists
    await this.findOne(id);

    // Optionally, verify the new foreign keys if they are being changed
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
