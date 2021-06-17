import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

function transform(data: any) {
  const mutated = {};
  for (const key in data) {
    if (key.includes('_id')) {
      const entityKey = key.split('_id')[0];
      mutated[entityKey] = { id: data[key] };
    } else {
      mutated[key] = data[key];
    }
  }
  return mutated;
}

@Injectable()
export class TransformIdToEntityInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    request.body = transform(request.body);
    return next.handle().pipe(map(data => data));
  }
}
