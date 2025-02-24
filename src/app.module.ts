import {
  forwardRef,
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppConfig } from './lib/config/app.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmPostgresConfig } from './lib/config/orm.config';
import { UserModule } from './module/user/user.module';
import { AuthModule } from './module/auth/auth.module';
import { SharedModule } from './lib/shared/shared.module';
import { LoggerMiddleware } from './lib/shared/middle-ware/logger.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [AppConfig] }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: TypeOrmPostgresConfig,
    }),
    UserModule,
    AuthModule,
    SharedModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
