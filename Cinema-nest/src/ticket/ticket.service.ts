import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Ticket } from 'generated/prisma';

@Injectable()
export class TicketService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTicketDto: CreateTicketDto): Promise<Ticket> {
    if (createTicketDto.userId) {
      await this.prisma.user.findUniqueOrThrow({
        where: { id: createTicketDto.userId },
      });
    }

    await this.prisma.session.findUniqueOrThrow({
      where: { id: createTicketDto.sessionId },
    });

    return this.prisma.ticket.create({
      data: createTicketDto,
    });
  }

  findAll(): Promise<Ticket[]> {
    return this.prisma.ticket.findMany({
      include: {
        user: true,
        session: {
          include: {
            movie: true,
            theater: true,
          },
        },
      },
    });
  }

  async findOne(id: number): Promise<Ticket> {
    const ticket = await this.prisma.ticket.findUnique({
      where: { id },
      include: {
        user: true,
        session: {
          include: {
            movie: true,
            theater: true,
          },
        },
      },
    });

    if (!ticket) {
      throw new NotFoundException(`Ticket with ID #${id} not found`);
    }

    return ticket;
  }

  async update(id: number, updateTicketDto: UpdateTicketDto): Promise<Ticket> {
    await this.findOne(id); // Ensure the ticket exists

    return this.prisma.ticket.update({
      where: { id },
      data: updateTicketDto,
    });
  }

  async remove(id: number): Promise<Ticket> {
    await this.findOne(id); // Ensure the ticket exists

    return this.prisma.ticket.delete({
      where: { id },
    });
  }
}
