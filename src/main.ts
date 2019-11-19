import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Initializer } from './common/initializers/initializer';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const options = new DocumentBuilder()
    .setTitle('Restaurent example')
    .setDescription('The restaurent API description')
    .setVersion('1.0')
    .addTag('restarents')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  await Initializer.initAdminUser();
  await app.listen(3001);
  console.log('app atarted at port : 3001');
}
bootstrap();
