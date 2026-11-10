import { Module } from '@nestjs/common';
import { InventoryClientModule } from '../inventory/inventory-client.module';
import { OrderHttpController } from './order.http.controller';
import { OrderService } from './order.service';

@Module({
  imports: [InventoryClientModule],
  controllers: [OrderHttpController],
  providers: [OrderService],
})
export class OrderModule {}
