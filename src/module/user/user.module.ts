import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/lib/entity/user/user.entity';
import { BcryptService } from '../auth/service/bcrypt.service';
import { SharedModule } from 'src/lib/shared/shared.module';
import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';
import { UserSettings } from 'src/lib/entity/user/user-setting.entity';
import { RefreshToken } from 'src/lib/entity/user/refresh-token.entity';
import { Notification } from 'src/lib/entity/user/notification.entity';
import { NotificationsController as NotificationController } from './controller/notification.controller';
import { NotificationsService as NotificationService } from './service/notification.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserSettings, Notification, RefreshToken]),
    SharedModule,
  ],
  controllers: [UserController, NotificationController],
  providers: [UserService, BcryptService, NotificationService],
  exports: [UserService],
})
export class UserModule {}
