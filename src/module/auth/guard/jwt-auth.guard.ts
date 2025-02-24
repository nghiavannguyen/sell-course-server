import {
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from 'src/lib/shared/constant/meta-data';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  private readonly logger = new Logger(JwtAuthGuard.name);

  constructor(
    private reflector: Reflector,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {
    super();
  }
  extractTokenFromHeader(headerAuthorize: String) {
    if (headerAuthorize && headerAuthorize.startsWith('Bearer ')) {
      return headerAuthorize.split(' ')[1];
    }
    return null;
  }

  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const headerAuthorize = request.headers.authorization;
    const token = this.extractTokenFromHeader(headerAuthorize as string);
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    this.logger.log(`Token ${token}`);
    if (!token) {
      throw new UnauthorizedException();
    }

    const payload = this.jwtService.decode(token);
    this.logger.log('payload ', payload);

    return super.canActivate(context);
  }
}
