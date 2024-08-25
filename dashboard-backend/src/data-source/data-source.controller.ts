import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { DataSourcesService } from './data-source.service';
import { DataSource } from './data-source.entity/data-source.entity';

@Controller('data-sources')
export class DataSourcesController {
  constructor(private readonly dataSourcesService: DataSourcesService) {}

  @Post()
  async create(@Body() body: any): Promise<string> {
    const { name, description, market } = body;
    if (!name) {
      return 'Name is required';
    }
    return this.dataSourcesService.create({ name, description, market });
  }

  @Get()
  async findAll(): Promise<DataSource[]> {
    return this.dataSourcesService.findAll();
  }

  @Get(':type')
  async getMarketData(@Param('type') type: string): Promise<any> {
    return this.dataSourcesService.getMarketData(type);
  }

  @Post(':type')
  async createMarketData(
    @Param('type') type: string,
    @Body() data: any,
  ): Promise<any> {
    return this.dataSourcesService.createMarketData(type, data);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() body: any,
  ): Promise<DataSource | string> {
    const { name, description } = body;
    if (!name && !description) {
      return 'At least one field (name or description) is required for update';
    }
    return this.dataSourcesService.update(id, { name, description });
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<string> {
    return this.dataSourcesService.remove(id);
  }
}
