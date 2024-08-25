import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DataSource } from './data-source.entity/data-source.entity';
import { BSEDataSource } from './data-source.entity/bse-data-source.entity';
import { NSEDataSource } from './data-source.entity/nse-data-source.entity';

@Injectable()
export class DataSourcesService {
  constructor(
    @InjectRepository(DataSource)
    private readonly dataSourceRepository: Repository<DataSource>,

    @InjectRepository(BSEDataSource)
    private readonly bseDataSourceRepository: Repository<BSEDataSource>,
    
    @InjectRepository(NSEDataSource)
    private readonly nseDataSourceRepository: Repository<NSEDataSource>,
  ) {}

  async create(dataSource: Partial<DataSource>): Promise<string> {
    const existingDataSource = await this.dataSourceRepository.findOneBy({ name: dataSource.name });
    if (existingDataSource) {
      return `Data source with name '${dataSource.name}' already exists`;
    }
    const newDataSource = this.dataSourceRepository.create(dataSource);
    await this.dataSourceRepository.save(newDataSource);
    return `Data source '${dataSource.name}' has been successfully created`;
  }

  async getMarketData(type: string): Promise<any> {
    switch (type.toLowerCase()) {
      case 'bse':
        return this.bseDataSourceRepository.find();
      case 'nse':
        return this.nseDataSourceRepository.find();
      default:
        throw new Error('Invalid data source type');
    }
  }

  async createMarketData(type: string, data: any): Promise<any> {
    let createdData;
    switch (type.toLowerCase()){
      case 'bse':
        createdData = await this.bseDataSourceRepository.save(data);
        break;
      case 'nse':
        createdData = await this.nseDataSourceRepository.save(data);
        break;
      default:
        throw new Error('Invalid data source type');
    }
    return {
      message: 'Data inserted successfully',
      data: createdData,
    };
  }

  async findAll(): Promise<DataSource[]> {
    return this.dataSourceRepository.find();
  }

  async update(id: number, updateDataSource: Partial<DataSource>): Promise<DataSource | any> {
    await this.dataSourceRepository.update(id, updateDataSource);
    return {message: 'Data updated successfully', data: this.dataSourceRepository.findOneBy({ id })};
  }

  async remove(id: number): Promise<string> {
    const result = await this.dataSourceRepository.delete(id);
    if (result.affected === 0) {
      return `Data source with ID ${id} not found`;
    }
    return `Data source with ID ${id} has been successfully deleted`;
  }
}
