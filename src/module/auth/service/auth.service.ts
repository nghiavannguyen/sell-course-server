import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { BcryptService } from './bcrypt.service';
import { LoginDto } from '../dto/login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RefreshToken } from 'src/lib/entity/user/refresh-token.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/module/user/service/user.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private bcryptService: BcryptService,
    @InjectRepository(RefreshToken)
    private readonly refreshRepository: Repository<RefreshToken>,
  ) {}

  async refreshToken(token: string) {
    try {
      const objRf = await this.refreshRepository.findOne({
        where: { refreshToken: token },
        relations: ['user'],
      });
      this.logger.log(
        `refreshToken ${JSON.stringify(objRf)} ${objRf.expireAt} ${
          objRf.user.id
        }`,
      );

      if (!objRf || objRf.expireAt < new Date()) {
        throw new HttpException(
          'Invalid or expired refresh_token',
          HttpStatus.BAD_REQUEST,
        );
      }
      const user = await this.userService.findOne(objRf.user.id);
      const payload = {
        username: user.email,
        userId: user.id,
        role: user.role,
      };
      return {
        access_token: this.jwtService.sign(payload),
      };
    } catch (e) {
      console.log(e.message);
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }
  async logout(refreshToken: string) {
    await this.refreshRepository.delete({ refreshToken });
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (
      user &&
      (await this.bcryptService.comparePasswords(password, user.password))
    ) {
      console.log('So sánh password giống nhau ');

      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: LoginDto) {
    try {
      const result = await this.validateUser(user.username, user.password);
      console.log('result ', result);
      if (!result) {
        throw new HttpException(
          'Invalid username or password',
          HttpStatus.BAD_REQUEST,
        );
      }
      const payload = {
        username: result.email,
        userId: result.id,
        role: result.role,
      };
      console.log('payload login ', payload);

      const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });
      console.log('refreshToken ', refreshToken);
      const usr = await this.userService.findOne(result.userId);
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 7);
      console.log(`expiresAt ${expiresAt}`);
      await this.refreshRepository.save({
        user: usr,
        refreshToken,
        expireAt: expiresAt,
      });

      return {
        ...result,
        access_token: this.jwtService.sign(payload, { expiresIn: '1h' }),
        refresh_token: this.jwtService.sign(payload, { expiresIn: '7d' }),
      };
    } catch (error) {
      console.log('error ', error.message);
      throw new HttpException(`${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }
}
