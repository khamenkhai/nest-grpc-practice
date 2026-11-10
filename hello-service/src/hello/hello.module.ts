import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { HelloGrpcController } from './hello.grpc.controller';
import { HelloService } from './hello.service';

@Module({
  controllers: [HealthController, HelloGrpcController],
  providers: [HelloService],
})
export class HelloModule {}
