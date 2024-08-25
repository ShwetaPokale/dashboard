import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { DataSource } from '../../data-source/data-source.entity/data-source.entity';
import { CategoryChart } from '../chart.entity/category-chart.entity';

@Entity('charts')
export class Chart {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  chartType: string;

  @ManyToOne(() => DataSource, (dataSource) => dataSource.charts)
  dataSource: DataSource;

  @OneToMany(() => CategoryChart, (categoryChart) => categoryChart.chart)
  categoryCharts: CategoryChart[];
}
