import { Module } from '@nestjs/common';
import { ClientGrpc, ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { HelloClient } from './hello.client';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'HELLO_GRPC_CLIENT',
        transport: Transport.GRPC,
        options: {
          package: 'hello',
          protoPath: join(__dirname, '..', 'proto/hello.proto'),
          url: process.env.HELLO_GRPC_URL ?? 'localhost:5001',
        },
      },
    ]),
  ],
  providers: [
    {
      provide: HelloClient,
      useFactory: (client: ClientGrpc) => new HelloClient(client),
      inject: ['HELLO_GRPC_CLIENT'],
    },
  ],
  exports: [HelloClient],
})
export class HelloClientModule {}
