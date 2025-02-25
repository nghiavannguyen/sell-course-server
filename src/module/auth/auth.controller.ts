import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { LoginDto } from './dto/login.dto';
import { Public } from 'src/lib/shared/constant/meta-data';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('/register')
  @Public()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post('/login')
  @Public()
  login(@Body() login: LoginDto) {
    return this.authService.login(login);
  }

  @Post('refresh')
  @Public()
  async refresh(@Body('refreshToken') refreshToken: string) {
    if (!refreshToken)
      throw new UnauthorizedException('Refresh token required');
    return this.authService.refreshToken(refreshToken);
  }

  @Post('logout')
  @Public()
  async logout(@Body('refreshToken') refreshToken: string) {
    if (!refreshToken)
      throw new UnauthorizedException('Refresh token required');
    return this.authService.logout(refreshToken);
  }
}
