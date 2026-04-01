import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('The official API documentation for the grpc testigng')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.use(
    '/reference',
    apiReference({
      content: document,
    }),
  );

  const PORT = process.env.PORT ?? 3000;

  console.log(`Swagger: http://localhost:${PORT}/swagger`);
  console.log(`Scalar: http://localhost:${PORT}/reference`);

  await app.listen(PORT);
}
bootstrap();
