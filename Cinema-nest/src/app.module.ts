import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { MovieModule } from './movie/movie.module';
import { TicketModule } from './ticket/ticket.module';
import { TheaterModule } from './theater/theater.module';
import { SessionModule } from './session/session.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    UserModule,
    MovieModule,
    TicketModule,
    TheaterModule,
    SessionModule,
  ],
})
export class AppModule {}
