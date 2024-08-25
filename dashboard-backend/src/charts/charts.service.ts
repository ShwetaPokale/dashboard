import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Chart } from './chart.entity/chart.entity';
import { DataSource } from '../data-source/data-source.entity/data-source.entity';
import { CategoryChart } from './chart.entity/category-chart.entity';

@Injectable()
export class ChartsService {
  constructor(
    @InjectRepository(Chart)
    private readonly chartRepository: Repository<Chart>,
    @InjectRepository(DataSource)

    @InjectRepository(CategoryChart)
    private readonly categoryChartRepository: Repository<CategoryChart>
  ) {}

  async createChart(chart: Partial<Chart>): Promise<Chart> {
    const newChart = this.chartRepository.create(chart);
    return this.chartRepository.save(newChart);
  }

  async createCategoryChart(categoryChart: Partial<CategoryChart>): Promise<CategoryChart> {
    const newCategoryChart = this.categoryChartRepository.create(categoryChart);
    return this.categoryChartRepository.save(newCategoryChart);
  }

  async findAllCharts(): Promise<Chart[]> {
    return this.chartRepository.find({ relations: ['dataSource', 'categoryCharts', 'categoryCharts.category'] });
  }
}
