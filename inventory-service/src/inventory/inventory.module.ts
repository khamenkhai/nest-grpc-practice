import { Module } from '@nestjs/common';
import { InventoryGrpcController } from './inventory.grpc.controller';
import { InventoryHttpController } from './inventory.http.controller';
import { InventoryService } from './inventory.service';

@Module({
  controllers: [InventoryHttpController, InventoryGrpcController],
  providers: [InventoryService],
})
export class InventoryModule {}
