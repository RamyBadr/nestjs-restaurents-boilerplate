import { Module } from '@nestjs/common';
import { CatsModule } from './cats/cats.module';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CitiesModule } from './cities/cities.module';

@Module({
  imports: [CatsModule,AuthModule, UsersModule,CitiesModule],
  controllers:[AppController]
})
export class AppModule {}