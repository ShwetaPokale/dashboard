import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Category } from '../../categories/categories.entity/categories.entity';
import { Chart } from './chart.entity';

@Entity('category_charts')
export class CategoryChart {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Category, (category) => category.categoryCharts)
  category: Category;

  @ManyToOne(() => Chart, (chart) => chart.categoryCharts)
  chart: Chart;
}
