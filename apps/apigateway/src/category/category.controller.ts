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
  CATEGORY_SERVICE_NAME,
  CategoryServiceClient,
} from 'types/proto/category';
import { CreateCategoryDto, UpdateCategoryDto } from './category.dto';

@ApiTags('Categories')
@Controller('category')
export class CategoryController implements OnModuleInit {
  private categoryService: CategoryServiceClient;

  constructor(
    @Inject('CATEGORY_PACKAGE')
    private readonly categoryClient: microservices.ClientGrpc,
  ) {}

  onModuleInit() {
    this.categoryService =
      this.categoryClient.getService<CategoryServiceClient>(
        CATEGORY_SERVICE_NAME,
      );
  }

  @Post('categories')
  @ApiOperation({ summary: 'Create a new category' })
  @ApiResponse({ status: 201, description: 'Category created successfully' })
  createCategory(@Body() data: CreateCategoryDto) {
    return this.categoryService.createCategory(data);
  }

  @Get('categories/:id')
  @ApiOperation({ summary: 'Get category by ID' })
  getCategoryById(@Param('id', ParseIntPipe) id: number) {
    return this.categoryService.findCategoryById({ id });
  }

  @Get('categories')
  @ApiOperation({ summary: 'Get all categories' })
  getAllCategories() {
    return this.categoryService.findAllCategories({});
  }

  @Put('categories/:id')
  @ApiOperation({ summary: 'Update a category' })
  updateCategory(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateCategoryDto,
  ) {
    return this.categoryService.updateCategory({ id, ...data });
  }

  @Delete('categories/:id')
  @ApiOperation({ summary: 'Delete a category' })
  @ApiResponse({ status: 200, description: 'Category deleted' })
  deleteCategory(@Param('id', ParseIntPipe) id: number) {
    return this.categoryService.deleteCategory({ id });
  }
}
