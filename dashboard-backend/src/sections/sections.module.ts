import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Section } from './sections.entity/sections.entity';
import { SectionsService } from './sections.service';
import { SectionsController } from './sections.controller';
import { Category } from '../categories/categories.entity/categories.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Section, Category])],
  providers: [SectionsService],
  controllers: [SectionsController],
})
export class SectionsModule {}
