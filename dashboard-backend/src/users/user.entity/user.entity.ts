import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { IsString, IsEmail, IsNotEmpty } from 'class-validator';
import { UserCategory } from '../../categories/categories.entity/user-category.entity';

@Entity('users') 
export class User {
  @PrimaryGeneratedColumn()
  userid: number;

  @Column()
  @IsNotEmpty()
  username: string;

  @Column()
  @IsNotEmpty()
  password: string;

  @Column()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @OneToMany(() => UserCategory, (userCategory) => userCategory.user)
  userCategories: UserCategory[];
}
