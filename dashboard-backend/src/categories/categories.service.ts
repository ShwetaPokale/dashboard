import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { Category } from './categories.entity/categories.entity';
import { Section } from '../sections/sections.entity/sections.entity';


@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,

    @InjectRepository(Section)
    private readonly sectionRepository: Repository<Section>
  ) { }

  async create(categoryData: any): Promise<string> {
    const { name, description, section } = categoryData;
    if (!section.id) {
      return `SectionId is required`;
    }
    const sectionid = await this.sectionRepository.findOne({ where: { id: section.id } });
    if (!sectionid) {
      return `Section with ID ${section.id} does not exist`;
    }
    const existingCategory = await this.categoryRepository.findOne({
      where: { name, section: { id: section.id } },
      relations: ['section'],
    });
    if (existingCategory) {
      return `Category '${name}' already exists in Section '${section.id}'`;
    }
    const newCategory = this.categoryRepository.create({ name, description, section });
    await this.categoryRepository.save(newCategory);

    return `Category '${name}' has been successfully created in Section '${section.id}'`;
  }


  async findAll(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  async findOne(id: number): Promise<Category> {
    return this.categoryRepository.findOneBy({ id });
  }

  async update(id: number, updateCategory: Partial<Category>): Promise<Category> {
    await this.categoryRepository.update(id, updateCategory);
    return this.findOne(id);
  }

  async remove(id: number): Promise<DeleteResult> {
    return this.categoryRepository.delete(id);
  }
  
}
