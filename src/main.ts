import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common/pipes';
import { SwaggerModule } from '@nestjs/swagger';
import { configSwagger } from './lib/config/swagger.config';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ResponseFormatInterceptor } from './lib/shared/interceptor/res.interceptor';
import { PostStatusInterceptor } from './lib/shared/interceptor/post-status.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.enableCors();
  app.setGlobalPrefix('/api');
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  const document = SwaggerModule.createDocument(app, configSwagger);

  // Ứng dụng của Interceptor
  // Thay đổi status code (như trong đoạn code của bạn).
  // Ghi log request/response.
  // Thêm dữ liệu vào phản hồi.
  // Xử lý lỗi toàn cục.
  // Cache kết quả.
  app.useGlobalInterceptors(
    new ResponseFormatInterceptor(),
    new PostStatusInterceptor(),
  );

  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.APP_PORT);
  const url = await app.getUrl();

  new Logger('main').debug('Server is running on port ' + process.env.APP_PORT);
  new Logger('main').debug(`Go to swagger ${url}/api/`);
}
bootstrap();
