import { Injectable } from '@nestjs/common';
import { status } from '@grpc/grpc-js';
import { RpcException } from '@nestjs/microservices';
import {
  InventoryItem,
  ReserveInventoryRequest,
  ReserveInventoryResponse,
} from './inventory.types';

@Injectable()
export class InventoryService {
  private readonly items: InventoryItem[] = [
    { sku: 'LAPTOP-001', name: 'Developer Laptop', availableQuantity: 5 },
    { sku: 'MOUSE-001', name: 'Wireless Mouse', availableQuantity: 20 },
  ];

  findAll(): InventoryItem[] {
    return this.items.map((item) => ({ ...item }));
  }

  findBySku(sku: string): InventoryItem {
    const item = this.items.find((candidate) => candidate.sku === sku);
    if (!item) {
      throw new RpcException({
        code: status.NOT_FOUND,
        message: `Inventory item ${sku} was not found`,
      });
    }
    return { ...item };
  }

  reserve(data: ReserveInventoryRequest): ReserveInventoryResponse {
    const item = this.items.find((candidate) => candidate.sku === data.sku);
    if (!item) {
      throw new RpcException({
        code: status.NOT_FOUND,
        message: `Inventory item ${data.sku} was not found`,
      });
    }
    if (data.quantity <= 0) {
      throw new RpcException({
        code: status.INVALID_ARGUMENT,
        message: 'Quantity must be greater than zero',
      });
    }
    if (item.availableQuantity < data.quantity) {
      throw new RpcException({
        code: status.FAILED_PRECONDITION,
        message: `Only ${item.availableQuantity} unit(s) of ${data.sku} remain`,
      });
    }

    item.availableQuantity -= data.quantity;
    return {
      reserved: true,
      sku: item.sku,
      reservedQuantity: data.quantity,
      remainingQuantity: item.availableQuantity,
    };
  }
}
