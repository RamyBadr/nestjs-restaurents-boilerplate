import { Module, ValidationPipe } from '@nestjs/common';
import { RestaurentsModule } from './restaurents/restaurents.module';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CitiesModule } from './cities/cities.module';
import { DatabaseModule } from './database/database.module';
import { APP_PIPE } from '@nestjs/core';
@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    UsersModule,
    CitiesModule,
    RestaurentsModule
  ],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe
    }
  ],
  controllers: [AppController]
})
export class AppModule {
  constructor() {}
}
