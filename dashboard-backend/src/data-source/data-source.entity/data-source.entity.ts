import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Chart } from '../../charts/chart.entity/chart.entity';

@Entity('data_sources')
export class DataSource {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  market: string;

  @OneToMany(() => Chart, (chart) => chart.dataSource)
  charts: Chart[];
}

