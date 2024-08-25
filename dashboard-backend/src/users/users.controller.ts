import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity/user.entity';
import { CategoriesService } from '../categories/categories.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly categoriesService: CategoriesService,
  ) {}

  @Post()
  async create(@Body() body: any): Promise<any> {
    const { username, password, email, categoryIds } = body;
    if (!username || !password || !email || !categoryIds) {
      return 'All fields (username, password, email, and categoryIds) are required';
    }
    const existingUser = await this.usersService.findByUsername(username);
    if (existingUser) {
      return 'User with this username already exists';
    }
    for (const categoryId of categoryIds) {
      const category = await this.categoriesService.findOne(categoryId);
      if (!category) {
        return `Category with ID ${categoryId} not found`;
      }
    }
   const result = await this.usersService.create(username, password, email, categoryIds);
    return { Status: true, message: 'User inserted successfully', data: result };
  }
  
  

  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<User | string> {
    return this.usersService.findOne(id) || `User with ID ${id} not found`;
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() body: any,
  ): Promise<User | string> {
    const { username, email, password } = body;
    if (!username && !email && !password) {
      return 'At least one field (username, email, or password) is required for update';
    }
    return this.usersService.update(id, { username, email, password });
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<string> {
    return this.usersService.remove(id);
  }
}
