import { Test, TestingModule } from '@nestjs/testing';
import { DataSourcesService } from './data-source.service';

describe('DataSourceService', () => {
  let service: DataSourcesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DataSourcesService],
    }).compile();

    service = module.get<DataSourcesService>(DataSourcesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
