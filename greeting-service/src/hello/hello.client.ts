import { BadGatewayException, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { catchError, lastValueFrom, throwError } from 'rxjs';
import { HelloReply, HelloServiceClient } from './hello.types';

@Injectable()
export class HelloClient implements OnModuleInit {
  private helloService: HelloServiceClient;

  constructor(private readonly grpcClient: ClientGrpc) {}

  onModuleInit() {
    this.helloService =
      this.grpcClient.getService<HelloServiceClient>('HelloService');
  }

  async sayHello(name: string): Promise<HelloReply> {
    console.log(`📞 [GREETING SERVICE] Calling hello-service with gRPC...`);

    const response = await lastValueFrom(
      this.helloService.sayHello({ name }).pipe(
        catchError(() =>
          throwError(
            () =>
              new BadGatewayException(
                'hello-service is unavailable. Start it first.',
              ),
          ),
        ),
      ),
    );

    console.log(`✅ [GREETING SERVICE] gRPC response received: ${response.message}`);
    return response;
  }
}
