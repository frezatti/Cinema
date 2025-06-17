import {
  IsString,
  IsNotEmpty,
  IsInt,
  IsPositive,
  IsDateString,
  IsNumber,
  IsIn,
} from 'class-validator';

export class CreateSessionDto {
  @IsString()
  @IsIn(['Dublado', 'Legendado'])
  language: string;

  @IsString()
  @IsIn(['2D', '3D', 'IMAX'])
  format: string;

  @IsNumber()
  @IsPositive()
  price: number;

  @IsDateString()
  @IsNotEmpty()
  dateTime: string;

  @IsInt()
  @IsPositive()
  movieId: number;

  @IsInt()
  @IsPositive()
  theaterId: number;
}
