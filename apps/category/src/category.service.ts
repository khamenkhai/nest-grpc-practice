import { Injectable, NotFoundException } from '@nestjs/common';
import {
  Category,
  CategoryById,
  CategoryList,
  CreateCategoryRequest,
  UpdateCategoryRequest,
  Empty,
} from 'types/proto/category';

@Injectable()
export class CategoryService {
  private categories: Category[] = [];
  private nextId = 1;

  createCategory(data: CreateCategoryRequest): Category {
    const category: Category = {
      id: this.nextId++,
      ...data,
    };
    this.categories.push(category);
    return category;
  }

  findCategoryById(data: CategoryById): Category {
    const category = this.categories.find((c) => c.id === data.id);
    if (!category) {
      throw new NotFoundException(`Category with ID ${data.id} not found`);
    }
    return category;
  }

  findAllCategories(): CategoryList {
    return { categories: this.categories };
  }

  updateCategory(data: UpdateCategoryRequest): Category {
    const index = this.categories.findIndex((c) => c.id === data.id);
    if (index === -1) {
      throw new NotFoundException(`Category with ID ${data.id} not found`);
    }
    this.categories[index] = { ...this.categories[index], ...data };
    return this.categories[index];
  }

  deleteCategory(data: CategoryById): Empty {
    const index = this.categories.findIndex((c) => c.id === data.id);
    if (index !== -1) {
      this.categories.splice(index, 1);
    }
    return {};
  }
}
