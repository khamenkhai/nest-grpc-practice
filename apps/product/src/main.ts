import { NestFactory } from '@nestjs/core';
import { ProductModule } from './product.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { PRODUCT_PACKAGE_NAME } from 'types/proto/product';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    ProductModule,
    {
      transport: Transport.GRPC,
      options: {
        package: PRODUCT_PACKAGE_NAME,
        protoPath: join(__dirname, '..', '..', '..', 'proto', 'product.proto'),
        url: 'localhost:5002',
      },
    },
  );
  await app.listen();
}
bootstrap();
