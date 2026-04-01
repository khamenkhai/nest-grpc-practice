import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateProductRequest,
  Product,
  ProductById,
  UpdateProductRequest,
  CategoryId,
  ProductList,
  Empty,
} from 'types/proto/product';

@Injectable()
export class ProductService {
  private products: Product[] = [];
  private nextId = 1;

  createProduct(data: CreateProductRequest): Product {
    const product: Product = {
      id: this.nextId++,
      ...data,
    };
    this.products.push(product);
    return product;
  }

  findProductById(data: ProductById): Product {
    const product = this.products.find((p) => p.id === data.id);

    if (!product) {
      throw new NotFoundException(`Product with ID ${data.id} not found`);
    }

    return product;
  }

  findProductsByCategory(data: CategoryId): ProductList {
    const filteredProducts = this.products.filter(
      (p) => p.categoryId === data.id,
    );
    return { products: filteredProducts };
  }

  updateProduct(data: UpdateProductRequest): Product {
    const index = this.products.findIndex((p) => p.id === data.id);

    if (index === -1) {
      throw new NotFoundException(`Product with ID ${data.id} not found`);
    }

    this.products[index] = { ...this.products[index], ...data };
    return this.products[index];
  }

  deleteProduct(data: ProductById): Empty {
    const index = this.products.findIndex((p) => p.id === data.id);

    if (index !== -1) {
      this.products.splice(index, 1);
    }

    return {};
  }
}
