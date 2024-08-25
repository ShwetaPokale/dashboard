import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Section } from '../../sections/sections.entity/sections.entity';
import { CategoryChart } from '../../charts/chart.entity/category-chart.entity';
import { UserCategory } from './user-category.entity';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Section, (section) => section.categories)
  section: Section;

  @Column({ nullable: true })
  description: string;

  @OneToMany(() => UserCategory, (userCategory) => userCategory.category)
  userCategories: UserCategory[];

  @OneToMany(() => CategoryChart, (categoryChart) => categoryChart.category)
  categoryCharts: CategoryChart[];
}
