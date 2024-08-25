import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Section } from './sections.entity/sections.entity';

@Injectable()
export class SectionsService {
  constructor(
    @InjectRepository(Section)
    private readonly sectionRepository: Repository<Section>,
  ) {}

  async create(section: Partial<Section>): Promise<string> {
    const existingSection = await this.sectionRepository.findOneBy({
      name: section.name,
    });
    if (existingSection) {
      return `Section with name '${section.name}' already exists`;
    }
    const newSection = this.sectionRepository.create(section);
    await this.sectionRepository.save(newSection);
    return `Section '${section.name}' has been successfully created`;
  }

  async findAll(): Promise<Section[]> {
    return this.sectionRepository.find();
  }

  async findOne(id: number): Promise<Section> {
    return this.sectionRepository.findOneBy({ id });
  }

  async update(id: number, updateSection: Partial<Section>): Promise<Section> {
    await this.sectionRepository.update(id, updateSection);
    return this.findOne(id);
  }

  async remove(id: number): Promise<DeleteResult> {
    return this.sectionRepository.delete(id);
  }
}
