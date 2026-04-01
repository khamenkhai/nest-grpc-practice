import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { ProductService } from './product.service';

@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @GrpcMethod('ProductService', 'CreateProduct')
  createProduct(data: {
    name: string;
    description: string;
    price: number;
    categoryId: number;
  }) {
    return this.productService.createProduct(data);
  }

  @GrpcMethod('ProductService', 'FindProductById')
  findProductById(data: { id: number }) {
    return this.productService.findProductById(data);
  }

  @GrpcMethod('ProductService', 'FindProductsByCategory')
  findProductsByCategory(data: { id: number }) {
    return this.productService.findProductsByCategory(data);
  }

  @GrpcMethod('ProductService', 'UpdateProduct')
  updateProduct(data: {
    id: number;
    name: string;
    description: string;
    price: number;
    categoryId: number;
  }) {
    return this.productService.updateProduct(data);
  }

  @GrpcMethod('ProductService', 'DeleteProduct')
  deleteProduct(data: { id: number }) {
    return this.productService.deleteProduct(data);
  }
}
