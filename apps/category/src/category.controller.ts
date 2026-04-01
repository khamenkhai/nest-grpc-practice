import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { CategoryService } from './category.service';

@Controller()
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @GrpcMethod('CategoryService', 'CreateCategory')
  createCategory(data: { name: string; description: string }) {
    return this.categoryService.createCategory(data);
  }

  @GrpcMethod('CategoryService', 'FindCategoryById')
  findCategoryById(data: { id: number }) {
    return this.categoryService.findCategoryById(data);
  }

  @GrpcMethod('CategoryService', 'FindAllCategories')
  findAllCategories() {
    return this.categoryService.findAllCategories();
  }

  @GrpcMethod('CategoryService', 'UpdateCategory')
  updateCategory(data: { id: number; name: string; description: string }) {
    return this.categoryService.updateCategory(data);
  }

  @GrpcMethod('CategoryService', 'DeleteCategory')
  deleteCategory(data: { id: number }) {
    return this.categoryService.deleteCategory(data);
  }
}
