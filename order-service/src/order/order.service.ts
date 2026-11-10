import { Injectable, NotFoundException } from '@nestjs/common';
import { InventoryClient } from '../inventory/inventory.client';
import { CreateOrderRequest, Order } from './order.types';

@Injectable()
export class OrderService {
  private readonly orders: Order[] = [];
  private nextId = 1;

  constructor(private readonly inventory: InventoryClient) {}

  async create(data: CreateOrderRequest): Promise<Order> {
    // The order is saved only after inventory confirms the reservation over gRPC.
    const reservation = await this.inventory.reserve(data.sku, data.quantity);
    const order: Order = {
      id: this.nextId++,
      ...data,
      status: 'CONFIRMED',
      remainingStock: reservation.remainingQuantity,
    };
    this.orders.push(order);
    return order;
  }

  findAll(): Order[] {
    return this.orders.map((order) => ({ ...order }));
  }

  findById(id: number): Order {
    const order = this.orders.find((candidate) => candidate.id === id);
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} was not found`);
    }
    return { ...order };
  }
}
