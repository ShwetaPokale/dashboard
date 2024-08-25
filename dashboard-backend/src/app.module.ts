import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { CategoriesModule } from './categories/categories.module';
import { SectionsModule } from './sections/sections.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSourceModule } from './data-source/data-source.module';
import { ChartsModule } from './charts/charts.module';
import { AuthModule } from './auth/auth.module';
import databaseConfig from './config';


@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    UsersModule, CategoriesModule, SectionsModule, DataSourceModule, DataSourceModule, ChartsModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
