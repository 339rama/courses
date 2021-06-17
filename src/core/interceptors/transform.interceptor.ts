import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  data: T;
}

function camelToUnderscore(key: string) {
  return key.replace(/([A-Z])/g, '_$1').toLowerCase();
}

function transform(data: any) {
  const mutated = {};
  for (var camel in data) {
    mutated[camelToUnderscore(camel)] = data[camel];
  }
  return mutated;
}

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    request.body = transform(request.body);

    return next.handle().pipe(map(data => data));
  }
}
