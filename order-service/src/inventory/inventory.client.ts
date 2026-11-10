import {
  BadGatewayException,
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { status } from '@grpc/grpc-js';
import { ClientGrpc } from '@nestjs/microservices';
import { catchError, lastValueFrom, throwError } from 'rxjs';
import {
  InventoryServiceClient,
  ReserveInventoryResponse,
} from './inventory.types';

interface GrpcError {
  code?: number;
  details?: string;
  message?: string;
}

@Injectable()
export class InventoryClient implements OnModuleInit {
  private service: InventoryServiceClient;

  constructor(private readonly grpcClient: ClientGrpc) {}

  onModuleInit() {
    this.service =
      this.grpcClient.getService<InventoryServiceClient>('InventoryService');
  }

  reserve(sku: string, quantity: number): Promise<ReserveInventoryResponse> {
    return lastValueFrom(
      this.service.reserveInventory({ sku, quantity }).pipe(
        catchError((error: GrpcError) => {
          const message = error.details ?? error.message;
          if (error.code === status.NOT_FOUND) {
            return throwError(() => new NotFoundException(message));
          }
          if (error.code === status.FAILED_PRECONDITION) {
            return throwError(() => new ConflictException(message));
          }
          if (error.code === status.INVALID_ARGUMENT) {
            return throwError(() => new BadRequestException(message));
          }
          return throwError(
            () =>
              new BadGatewayException(
                'Inventory service is unavailable. Start inventory-service first.',
              ),
          );
        }),
      ),
    );
  }
}
