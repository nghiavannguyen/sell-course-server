import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { BcryptService } from './bcrypt.service';
import { LoginDto } from '../dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private bcryptService: BcryptService,
  ) {}

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
        sub: result.user_id,
        role: result.role,
      };
      console.log('payload ', payload);

      return {
        ...result,
        access_token: this.jwtService.sign(payload),
      };
    } catch (error) {
      console.log('error ', error.message);
      throw new HttpException(`${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }
}
