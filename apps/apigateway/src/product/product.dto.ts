import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ example: 'Barcode Scanner' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'High-speed laser scanner' })
  @IsString()
  description: string;

  @ApiProperty({ example: 299.99 })
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  categoryId: number;
}

export class UpdateProductDto extends CreateProductDto {}
