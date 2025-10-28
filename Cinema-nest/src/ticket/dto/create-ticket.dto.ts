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
  @IsOptional()
  cpf?: string;

  @IsString()
  @IsNotEmpty()
  seat: string;

  @IsInt()
  @IsPositive()
  quantity: number;

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
