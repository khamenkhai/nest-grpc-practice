import { NestFactory } from '@nestjs/core';
import { CategoryModule } from './category.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { CATEGORY_PACKAGE_NAME } from 'types/proto/category';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    CategoryModule,
    {
      transport: Transport.GRPC,
      options: {
        package: CATEGORY_PACKAGE_NAME,
        protoPath: join(__dirname, '..', '..', '..', 'proto', 'category.proto'),
        url: 'localhost:5001',
      },
    },
  );
  await app.listen();
}
bootstrap();
