import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const httpPort = Number(process.env.GREETING_HTTP_PORT ?? 3002);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Greeting Service API')
    .setDescription('Receives a REST request and calls hello-service over gRPC.')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('swagger', app, document);
  app.use('/reference', apiReference({ content: document }));

  await app.listen(httpPort);
  console.log(`🚀 [GREETING SERVICE] HTTP running at http://localhost:${httpPort}`);
  console.log(`🔗 [GREETING SERVICE] hello-service gRPC address: ${process.env.HELLO_GRPC_URL ?? 'localhost:5001'}`);
  console.log(`Swagger: http://localhost:${httpPort}/swagger`);
  console.log(`Scalar: http://localhost:${httpPort}/reference`);
}
void bootstrap();
