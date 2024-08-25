import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity/user.entity';
import { UserCategory } from '../categories/categories.entity/user-category.entity';
import { Category } from 'src/categories/categories.entity/categories.entity';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(UserCategory)
    private readonly userCategoryRepository: Repository<UserCategory>,

  ) {}

  async create(username: string, password: string, email: string, categoryIds: number[]): Promise<User> {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const user = this.userRepository.create({ username, password:hashedPassword, email });
    const savedUser = await this.userRepository.save(user);
    for (const categoryId of categoryIds) {
      const userCategory = this.userCategoryRepository.create({
        user: savedUser,
        category: { id: categoryId } as Category,
      });
      await this.userCategoryRepository.save(userCategory);
    }
    return savedUser;
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find({ relations: ['userCategories', 'userCategories.category'] });
  }

  async findOne(id: number): Promise<User | any> {
    const user = await this.userRepository.findOne({ where: {userid: id },  relations: ['userCategories', 'userCategories.category'],});
    if(!user){
      return `User with ID ${id} not found`;
    }
    return user;
  }

  async findByUsername(username: string): Promise<User | any> {
    if (!username) {
      return 'Username is required';
    }
    return this.userRepository.findOne({ where: { username } });
  }
  
  async findCategoriesForUser(userId: number): Promise<Category[]> {
    const user = await this.userRepository.findOne({
      where: { userid: userId },
      relations: ['userCategories', 'userCategories.category', 'userCategories.category.section'],
    });
    if (!user) {
      throw new Error(`User with ID ${userId} not found`);
    }
    return user.userCategories.map(uc => uc.category);
  }

  async update(id: number, updateUser: Partial<User>): Promise<User | string> {
    await this.userRepository.update(id, updateUser);
    return this.findOne(id);
  }

  async remove(id: number): Promise<string> {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) {
      return `User with ID ${id} not found`;
    }
    return `User with ID ${id} has been successfully deleted`;
  }

  async hasAccessToCategory(userId: number, categoryId: number): Promise<boolean> {
    const userCategory = await this.userCategoryRepository.findOne({
      where: { user: { userid: userId }, category: { id: categoryId } },
    });
    return !!userCategory;
  }

}
