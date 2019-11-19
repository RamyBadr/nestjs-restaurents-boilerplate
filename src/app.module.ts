import { Module } from '@nestjs/common';
import { CatsModule } from './cats/cats.module';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CitiesModule } from './cities/cities.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [DatabaseModule, CatsModule, AuthModule, UsersModule, CitiesModule],

  controllers: [AppController],
})
export class AppModule {
  constructor() {
    console.log('init appa module');
  }
}
