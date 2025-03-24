import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { ResponseBase } from '../constant/response_base';

@Injectable()
export class ResponseFormatInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        // Bạn có thể điều chỉnh statusCode, message theo nhu cầu. Ví dụ:
        const ctx = context.switchToHttp();
        const response = ctx.getResponse();
        const statusCode = response.statusCode;
        const message = data && data.message ? data.message : 'Success';
        return new ResponseBase(statusCode, message, data).toJSON();
      }),
    );
  }
}
