import { IsString, IsNotEmpty, IsInt, IsPositive, IsIn } from 'class-validator';

export class CreateTheaterDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  capacity: number;

  @IsString()
  @IsIn(['2D', '3D', 'IMAX'])
  type: string;
}
