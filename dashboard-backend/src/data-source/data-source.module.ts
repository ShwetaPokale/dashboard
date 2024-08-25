import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSourcesService } from './data-source.service';
import { DataSourcesController } from './data-source.controller';
import { BSEDataSource } from './data-source.entity/bse-data-source.entity';
import { NSEDataSource } from './data-source.entity/nse-data-source.entity';
import {DataSource} from './data-source.entity/data-source.entity'


@Module({
  imports: [
    TypeOrmModule.forFeature([DataSource,BSEDataSource, NSEDataSource]),
  ],
  providers: [DataSourcesService],
  controllers: [DataSourcesController],
  exports: [DataSourcesService],
})
export class DataSourceModule {}
