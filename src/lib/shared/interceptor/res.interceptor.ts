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
        return new ResponseBase('200', 'Success', data).toJSON();
      }),
    );
  }
}
