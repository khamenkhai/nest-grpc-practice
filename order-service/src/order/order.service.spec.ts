import { InventoryClient } from '../inventory/inventory.client';
import { OrderService } from './order.service';

describe('OrderService', () => {
  it('reserves inventory over gRPC before confirming an order', async () => {
    const reserve = jest.fn().mockResolvedValue({
      reserved: true,
      sku: 'LAPTOP-001',
      reservedQuantity: 2,
      remainingQuantity: 3,
    });
    const inventory = { reserve } as unknown as InventoryClient;
    const service = new OrderService(inventory);

    const result = await service.create({
      customerName: 'Ada Lovelace',
      sku: 'LAPTOP-001',
      quantity: 2,
    });

    expect(reserve).toHaveBeenCalledWith('LAPTOP-001', 2);
    expect(result).toEqual({
      id: 1,
      customerName: 'Ada Lovelace',
      sku: 'LAPTOP-001',
      quantity: 2,
      status: 'CONFIRMED',
      remainingStock: 3,
    });
  });
});
