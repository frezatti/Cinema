import {
  IsString,
  IsNotEmpty,
  IsInt,
  IsPositive,
  IsOptional,
} from 'class-validator';

export class CreateTicketDto {
  @IsString()
  @IsNotEmpty()
  customerName: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  cpf?: string;

  @IsString()
  @IsNotEmpty()
  seat: string;

  @IsString()
  @IsNotEmpty()
  paymentType: string;

  @IsInt()
  @IsPositive()
  sessionId: number;

  @IsInt()
  @IsPositive()
  @IsOptional()
  userId?: number;
}
