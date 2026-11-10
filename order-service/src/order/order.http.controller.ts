import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ApiConflictResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateOrderDto } from './order.dto';
import { OrderService } from './order.service';

@ApiTags('Orders')
@Controller('orders')
export class OrderHttpController {
  constructor(private readonly orders: OrderService) {}

  @Post()
  @ApiOperation({ summary: 'Create an order and reserve inventory over gRPC' })
  @ApiConflictResponse({ description: 'The inventory service has insufficient stock' })
  create(@Body() data: CreateOrderDto) {
    return this.orders.create(data);
  }

  @Get()
  @ApiOperation({ summary: 'List orders created by this service' })
  findAll() {
    return this.orders.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find an order by ID' })
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.orders.findById(id);
  }
}
