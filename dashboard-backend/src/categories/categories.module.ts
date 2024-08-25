import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { Category } from './categories.entity/categories.entity';
import { Section } from '../sections/sections.entity/sections.entity';
import { User } from '..//users/user.entity/user.entity';
import { DataSource } from '../data-source/data-source.entity/data-source.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Category, Section, User, DataSource]),
    forwardRef(() => UsersModule),
  ],
  providers: [CategoriesService],
  controllers: [CategoriesController],
  exports: [CategoriesService],
})
export class CategoriesModule {}
