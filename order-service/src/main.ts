import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const httpPort = Number(process.env.ORDER_HTTP_PORT ?? 3002);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Order Service API')
    .setDescription('Creates orders through REST and reserves stock from inventory-service over gRPC before confirming them.')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('swagger', app, document);
  app.use('/reference', apiReference({ content: document }));

  await app.listen(httpPort);
  console.log(`Order HTTP: http://localhost:${httpPort}`);
  console.log(`Inventory gRPC dependency: ${process.env.INVENTORY_GRPC_URL ?? 'localhost:5001'}`);
  console.log(`Swagger: http://localhost:${httpPort}/swagger`);
  console.log(`Scalar: http://localhost:${httpPort}/reference`);
}
void bootstrap();
