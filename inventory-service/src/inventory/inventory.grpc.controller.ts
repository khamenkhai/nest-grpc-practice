import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { InventoryService } from './inventory.service';
import { ReserveInventoryRequest } from './inventory.types';

@Controller()
export class InventoryGrpcController {
  constructor(private readonly inventory: InventoryService) {}

  @GrpcMethod('InventoryService', 'GetInventory')
  getInventory(data: { sku: string }) {
    return this.inventory.findBySku(data.sku);
  }

  @GrpcMethod('InventoryService', 'ReserveInventory')
  reserveInventory(data: ReserveInventoryRequest) {
    return this.inventory.reserve(data);
  }
}
