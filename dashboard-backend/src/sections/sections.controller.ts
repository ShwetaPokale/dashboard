import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { SectionsService } from './sections.service';
import { Section } from './sections.entity/sections.entity';
import { DeleteResult } from 'typeorm';

@Controller('sections')
export class SectionsController {
  constructor(private readonly sectionsService: SectionsService) {}

  @Post()
  async create(@Body() body: any): Promise<string> {
    const { name, description } = body;
    if (!name) {
      return 'Name is required';
    }
    const result = await this.sectionsService.create({ name, description });
    return result;
  }

  @Get()
  async findAll(): Promise<Section[]> {
    return this.sectionsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Section | string> {
    const section = await this.sectionsService.findOne(id);
    if (!section) {
      return `Section with ID ${id} not found`;
    }
    return section;
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() body: any,
  ): Promise<Section | string> {
    const { name, description } = body;
    if (!name && !description) {
      return 'At least one field (name or description) is required for update';
    }
    const section = await this.sectionsService.findOne(id);
    if (!section) {
      return `Section with ID ${id} not found`;
    }
    return this.sectionsService.update(id, section);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<string> {
    const result: DeleteResult = await this.sectionsService.remove(id);
    if (result.affected === 0) {
      return `Section with ID ${id} not found`;
    }
    return `Section with ID ${id} has been successfully deleted`;
  }
}
