import { InventoryService } from './inventory.service';

describe('InventoryService', () => {
  it('reserves stock and returns the remaining quantity', () => {
    const service = new InventoryService();
    expect(service.reserve({ sku: 'LAPTOP-001', quantity: 2 })).toEqual({
      reserved: true,
      sku: 'LAPTOP-001',
      reservedQuantity: 2,
      remainingQuantity: 3,
    });
  });

  it('rejects a reservation larger than the available stock', () => {
    const service = new InventoryService();
    expect(() => service.reserve({ sku: 'LAPTOP-001', quantity: 6 })).toThrow();
  });
});
