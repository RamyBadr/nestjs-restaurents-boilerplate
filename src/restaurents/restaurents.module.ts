import { Module } from '@nestjs/common';
import { restaurentsController } from './restaurents.controller';
import { restaurentsService } from './restaurents.service';
import { restaurentsProviders } from './restaurents.providers';
import { DatabaseModule } from '../database/database.module';
@Module({
  imports: [DatabaseModule],
  controllers: [restaurentsController],
  providers: [restaurentsService, ...restaurentsProviders],
})
export class restaurentsModule {}