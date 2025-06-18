import {
  IsString,
  IsNotEmpty,
  IsInt,
  IsPositive,
  IsDateString,
  IsOptional,
  Matches,
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

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  @Matches(/^data:image\/(jpeg|jpg|png|gif|webp);base64,/, {
    message: 'Invalid image format. Must be a valid base64 image.',
  })
  poster?: string;
}
