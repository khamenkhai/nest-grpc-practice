import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ReserveInventoryDto } from './inventory.dto';
import { InventoryService } from './inventory.service';

@ApiTags('Inventory')
@Controller('inventory')
export class InventoryHttpController {
  constructor(private readonly inventory: InventoryService) {}

  @Get()
  @ApiOperation({ summary: 'List the seeded inventory and current stock levels' })
  findAll() {
    return this.inventory.findAll();
  }

  @Get(':sku')
  @ApiOperation({ summary: 'Get the current stock for one SKU' })
  findBySku(@Param('sku') sku: string) {
    return this.inventory.findBySku(sku);
  }

  @Post('reserve')
  @ApiOperation({ summary: 'Reserve stock directly (the order service uses the equivalent gRPC method)' })
  reserve(@Body() data: ReserveInventoryDto) {
    return this.inventory.reserve(data);
  }
}
