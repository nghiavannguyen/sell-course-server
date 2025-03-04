import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class PostStatusInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest();
    const isPost = req.method === 'POST';
    return next.handle().pipe(
      map((data) => {
        if (isPost) {
          context.switchToHttp().getResponse().status(200);
        }
        return data;
      }),
    );
  }
}
