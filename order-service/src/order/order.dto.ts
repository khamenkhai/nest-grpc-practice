import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsPositive, IsString } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty({ example: 'Ada Lovelace' })
  @IsString()
  @IsNotEmpty()
  customerName: string;

  @ApiProperty({ example: 'LAPTOP-001', description: 'Reserved from inventory-service over gRPC' })
  @IsString()
  @IsNotEmpty()
  sku: string;

  @ApiProperty({ example: 2, minimum: 1 })
  @IsInt()
  @IsPositive()
  quantity: number;
}
