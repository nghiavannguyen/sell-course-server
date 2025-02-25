import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/lib/entity/user/user.entity';
import { BcryptService } from '../auth/service/bcrypt.service';
import { RefreshToken } from 'src/lib/entity/user/refresh-token.entity';
import { SharedModule } from 'src/lib/shared/shared.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), SharedModule],
  controllers: [UserController],
  providers: [UserService, BcryptService],
  exports: [UserService],
})
export class UserModule {}
