import { Module } from '@nestjs/common';
import { ClientGrpc, ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { InventoryClient } from './inventory.client';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'INVENTORY_GRPC_CLIENT',
        transport: Transport.GRPC,
        options: {
          package: 'inventory',
          protoPath: join(__dirname, '..', 'proto/inventory.proto'),
          url: process.env.INVENTORY_GRPC_URL ?? 'localhost:5001',
        },
      },
    ]),
  ],
  providers: [
    {
      provide: InventoryClient,
      useFactory: (client: ClientGrpc) => new InventoryClient(client),
      inject: ['INVENTORY_GRPC_CLIENT'],
    },
  ],
  exports: [InventoryClient],
})
export class InventoryClientModule {}
