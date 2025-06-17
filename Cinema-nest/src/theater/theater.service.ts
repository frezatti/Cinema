import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTheaterDto } from './dto/create-theater.dto';
import { UpdateTheaterDto } from './dto/update-theater.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Theater } from 'generated/prisma';

@Injectable()
export class TheaterService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTheaterDto: CreateTheaterDto): Promise<Theater> {
    return await this.prisma.theater.create({
      data: createTheaterDto,
    });
  }

  async findAll(): Promise<Theater[]> {
    return await this.prisma.theater.findMany();
  }

  async findOne(id: number): Promise<Theater> {
    const theater = await this.prisma.theater.findUnique({
      where: { id },
    });

    if (!theater) {
      throw new NotFoundException(`Theater with Id: ${id}, not found 404`);
    }
    return theater;
  }

  async update(id: number, updateTheaterDto: UpdateTheaterDto) {
    await this.findOne(id);

    return this.prisma.theater.update({
      where: { id },
      data: updateTheaterDto,
    });
  }

  async remove(id: number): Promise<Theater> {
    await this.findOne(id);
    return this.prisma.theater.delete({
      where: { id },
    });
  }
}
