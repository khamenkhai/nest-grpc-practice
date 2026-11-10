export interface CreateOrderRequest {
  customerName: string;
  sku: string;
  quantity: number;
}

export interface Order extends CreateOrderRequest {
  id: number;
  status: 'CONFIRMED';
  remainingStock: number;
}
