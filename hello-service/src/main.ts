import { join } from 'path';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const grpcUrl = process.env.HELLO_GRPC_URL ?? '0.0.0.0:5001';
  const httpPort = Number(process.env.HELLO_HTTP_PORT ?? 3001);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: 'hello',
      protoPath: join(__dirname, 'proto/hello.proto'),
      url: grpcUrl,
    },
  });

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Hello Service API')
    .setDescription('A tiny gRPC server that returns a hello message.')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('swagger', app, document);
  app.use('/reference', apiReference({ content: document }));

  await app.startAllMicroservices();
  await app.listen(httpPort);
  console.log(
    `🚀 [HELLO SERVICE] HTTP running at http://localhost:${httpPort}`,
  );
  console.log(`🟢 [HELLO SERVICE] gRPC listening at ${grpcUrl}`);
  console.log(`Swagger: http://localhost:${httpPort}/swagger`);
  console.log(`Scalar: http://localhost:${httpPort}/reference`);
}
void bootstrap();
