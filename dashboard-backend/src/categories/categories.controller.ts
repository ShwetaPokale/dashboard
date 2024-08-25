import { Controller, Get, Post, Body, Param, Put, Delete, Req } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Category } from './categories.entity/categories.entity';
import { DeleteResult } from 'typeorm';
import { UsersService } from '../users/users.service';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService,
  private readonly userService: UsersService,
) {}

  @Post()
  async create(@Body() body: any): Promise<Category | string> {
    const { name, section, description } = body;
    if (!name) {
      return `Name is required`;
    }
    else if(!section || !section.id){
      return 'Section with ID is required'; 
    }
    const category = { name, section, description };
    return this.categoriesService.create(category);
  }

  @Get()
  async findAll(): Promise<Category[]> {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number, @Req() request: Request): Promise<any> {
    const userId = request.headers['userid']; 
    if (!userId) {
      return 'User ID is required';
    }
    const category = await this.categoriesService.findOne(id);
    if (!category) {
      return `Category with ID ${id} not found`;
    }
    const user = await this.userService.findOne(Number(userId));
    if (!user) {
      return 'User not found';
    }
    const hasAccess = await this.userService.hasAccessToCategory(user.userid, id);
    if (!hasAccess) {
      return `User does not have access to this category`;
    }
    return category;
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() body: any): Promise<Category | string> {
    const { name, description } = body; 
    if (!name && !description) {
      return 'At least one field (name or description) is required for update';
    }
    const category = await this.categoriesService.findOne(id);
    if (!category) {
      return `Category with ID ${id} not found`;
    }
    return this.categoriesService.update(id, category);
  }

  @Delete(':id')
  async remove(@Param('id') id: number):  Promise<string>  {
    const result: DeleteResult  = await this.categoriesService.remove(id);
    if (result.affected === 0) {
      return `Category with ID ${id} not found`;
    }
    return `Category with ID ${id} has been successfully deleted`;
  }

  @Get('user/:userId/section/:sectionId')
  async findCategoriesByUserAndSection(
    @Param('userId') userId: number,
    @Param('sectionId') sectionId: number,
  ): Promise<Category[]> {
    const accessibleCategories = await this.userService.findCategoriesForUser(userId);
    const filteredCategories = accessibleCategories.filter(cat => {
      return cat.section.id === +sectionId;
    });
    return filteredCategories;
  }
}
