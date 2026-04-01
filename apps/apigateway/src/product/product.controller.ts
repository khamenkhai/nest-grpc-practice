import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  OnModuleInit,
  Param,
  Post,
  Put,
  ParseIntPipe,
} from '@nestjs/common';
import * as microservices from '@nestjs/microservices';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import {
  ProductServiceClient,
  PRODUCT_SERVICE_NAME,
} from 'types/proto/product';
import { CreateProductDto, UpdateProductDto } from './product.dto';

@ApiTags('Products')
@Controller('product')
export class ProductController implements OnModuleInit {
  private productService: ProductServiceClient;

  constructor(
    @Inject('PRODUCT_PACKAGE')
    private readonly productClient: microservices.ClientGrpc,
  ) {}

  onModuleInit() {
    this.productService =
      this.productClient.getService<ProductServiceClient>(PRODUCT_SERVICE_NAME);
  }

  @Post('products')
  @ApiOperation({ summary: 'Create a new product' })
  createProduct(@Body() data: CreateProductDto) {
    return this.productService.createProduct(data);
  }

  @Get('products/:id')
  @ApiOperation({ summary: 'Get product by ID' })
  getProductById(@Param('id', ParseIntPipe) id: number) {
    return this.productService.findProductById({ id });
  }

  @Get('categories/:id/products')
  @ApiOperation({ summary: 'Get all products in a category' })
  getProductsByCategory(@Param('id', ParseIntPipe) id: number) {
    return this.productService.findProductsByCategory({ id });
  }

  @Put('products/:id')
  @ApiOperation({ summary: 'Update an existing product' })
  updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateProductDto,
  ) {
    return this.productService.updateProduct({ id, ...data });
  }

  @Delete('products/:id')
  @ApiOperation({ summary: 'Delete a product' })
  @ApiResponse({ status: 200, description: 'Product deleted successfully' })
  deleteProduct(@Param('id', ParseIntPipe) id: number) {
    return this.productService.deleteProduct({ id });
  }
}
