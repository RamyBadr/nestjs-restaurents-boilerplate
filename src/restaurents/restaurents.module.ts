import { Module } from '@nestjs/common';
import { RestaurentsController } from './restaurents.controller';
import { restaurentsService } from './restaurents.service';
import { restaurentsProviders } from './restaurents.providers';
import { DatabaseModule } from '../database/database.module';
@Module({
  imports: [DatabaseModule],
  controllers: [RestaurentsController],
  providers: [restaurentsService, ...restaurentsProviders],
})
export class RestaurentsModule {}