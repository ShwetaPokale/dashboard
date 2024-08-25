import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../../users/user.entity/user.entity';
import { Category } from './categories.entity';

@Entity('user_categories')
export class UserCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.userCategories)
  user: User;

  @ManyToOne(() => Category, (category) => category.userCategories)
  category: Category;
}
