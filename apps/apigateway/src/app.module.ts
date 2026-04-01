import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductController } from './product/product.controller';
import { CategoryController } from './category/category.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'PRODUCT_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'product',
          protoPath: join(__dirname, '..', '..', '..', 'proto', 'product.proto'),
          url: 'localhost:5002',
        },
      },
      {
        name: 'CATEGORY_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'category',
          protoPath: join(__dirname, '..', '..', '..', 'proto', 'category.proto'),
          url: 'localhost:5001',
        },
      },
    ]),
  ],
  controllers: [AppController, ProductController, CategoryController],
  providers: [AppService],
})
export class AppModule {}
