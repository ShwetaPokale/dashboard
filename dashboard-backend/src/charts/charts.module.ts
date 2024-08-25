import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChartsService } from './charts.service';
import { ChartsController } from './charts.controller';
import { Chart } from './chart.entity/chart.entity';
import { CategoryChart } from './chart.entity/category-chart.entity';
import { Category } from '../categories/categories.entity/categories.entity';
import { DataSource } from '../data-source/data-source.entity/data-source.entity';
import { BSEDataSource } from 'src/data-source/data-source.entity/bse-data-source.entity';
import { NSEDataSource } from 'src/data-source/data-source.entity/nse-data-source.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Chart, CategoryChart,Category, DataSource, BSEDataSource, NSEDataSource])],
  providers: [ChartsService],
  controllers: [ChartsController]
})
export class ChartsModule {}
