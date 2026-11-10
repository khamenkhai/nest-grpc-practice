import { join } from 'path';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const grpcUrl = process.env.INVENTORY_GRPC_URL ?? '0.0.0.0:5001';
  const httpPort = Number(process.env.INVENTORY_HTTP_PORT ?? 3001);
  app.connectMicroservice<MicroserviceOptions>({ transport: Transport.GRPC, options: {
    package: 'inventory', protoPath: join(__dirname, 'proto/inventory.proto'), url: grpcUrl,
  }});

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Inventory Service API')
    .setDescription('Owns stock levels and exposes inventory reservation operations over gRPC to order-service.')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('swagger', app, document);
  app.use('/reference', apiReference({ content: document }));

  await app.startAllMicroservices();
  await app.listen(httpPort);
  console.log(`Inventory HTTP: http://localhost:${httpPort}`);
  console.log(`Inventory gRPC: ${grpcUrl}`);
  console.log(`Swagger: http://localhost:${httpPort}/swagger`);
  console.log(`Scalar: http://localhost:${httpPort}/reference`);
}
void bootstrap();
