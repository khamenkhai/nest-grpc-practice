import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsPositive, IsString } from 'class-validator';

export class ReserveInventoryDto {
  @ApiProperty({ example: 'LAPTOP-001' })
  @IsString()
  @IsNotEmpty()
  sku: string;

  @ApiProperty({ example: 2, minimum: 1 })
  @IsInt()
  @IsPositive()
  quantity: number;
}
