import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ChartsService } from './charts.service';
import { Chart } from './chart.entity/chart.entity';
import { CategoryChart } from './chart.entity/category-chart.entity';

@Controller('charts')
export class ChartsController {
  constructor(private readonly chartsService: ChartsService) {}

  @Post()
  async create(@Body() chartData: Partial<Chart>) {
    return this.chartsService.createChart(chartData);
  }
  @Post('category-charts')
  async createCategoryChart(@Body() categoryChart: Partial<CategoryChart>): Promise<CategoryChart> {
    return this.chartsService.createCategoryChart(categoryChart);
  }

  @Get()
  async getAllCharts(): Promise<Chart[]> {
    return this.chartsService.findAllCharts();
  }

}
