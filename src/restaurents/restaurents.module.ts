import { Module } from '@nestjs/common';
import { RestaurentsController } from './restaurents.controller';
import { RestaurentsService } from './restaurents.service';
import { RestaurentsProviders } from './restaurents.providers';
import { DatabaseModule } from '../database/database.module';
@Module({
  imports: [DatabaseModule],
  controllers: [RestaurentsController],
  providers: [RestaurentsService, ...RestaurentsProviders]
})
export class RestaurentsModule {}
