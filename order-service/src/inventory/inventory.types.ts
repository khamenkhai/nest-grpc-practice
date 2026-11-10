import { Observable } from 'rxjs';

export interface ReserveInventoryResponse {
  reserved: boolean;
  sku: string;
  reservedQuantity: number;
  remainingQuantity: number;
}

export interface InventoryServiceClient {
  reserveInventory(request: {
    sku: string;
    quantity: number;
  }): Observable<ReserveInventoryResponse>;
}
