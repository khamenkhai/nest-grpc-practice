export interface InventoryItem {
  sku: string;
  name: string;
  availableQuantity: number;
}

export interface ReserveInventoryRequest {
  sku: string;
  quantity: number;
}

export interface ReserveInventoryResponse {
  reserved: boolean;
  sku: string;
  reservedQuantity: number;
  remainingQuantity: number;
}
