import { Module } from '@nestjs/common';
import { CitiesController } from './cities.controller';
import { CitiesService } from './cities.service';
import { citiesProviders } from './cities.providers';
import { DatabaseModule } from '../database/database.module';
@Module({
  imports: [DatabaseModule],
  controllers: [CitiesController],
  providers: [CitiesService, ...citiesProviders],
})
export class CitiesModule {}