import {
  IsString,
  IsNotEmpty,
  IsInt,
  IsPositive,
  IsDateString,
} from 'class-validator';

export class CreateMovieDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  genre: string;

  @IsString()
  @IsNotEmpty()
  rating: string;

  @IsInt()
  @IsPositive()
  duration: number;

  @IsDateString()
  @IsNotEmpty()
  releaseDate: string;
}
