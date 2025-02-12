import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common/pipes';
import { SwaggerModule } from '@nestjs/swagger';
import { configSwagger } from './config/swagger.config';
import { Logger } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.enableCors();
  app.setGlobalPrefix('/api');
  app.useGlobalPipes(new ValidationPipe());
  const document = SwaggerModule.createDocument(app, configSwagger);

  SwaggerModule.setup('api', app, document);

  const databaseService = app.get(DatabaseService);

  // Now you can use databaseService to call its methods
  const data = await databaseService.getData();
  new Logger('main').log(data);

  await app.listen(process.env.APP_PORT);
  const url = await app.getUrl();

  new Logger('main').debug('Server is running on port ' + process.env.APP_PORT);
  new Logger('main').debug(`Go to swagger ${url}/api/`);
}
bootstrap();
