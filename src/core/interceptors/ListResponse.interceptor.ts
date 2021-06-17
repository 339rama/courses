import { Injectable, NestInterceptor, ExecutionContext, CallHandler, mixin } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export abstract class ListResponseInterceptor implements NestInterceptor {
  protected abstract readonly mapTo: string;
  constructor() {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(map(data => ({ [this.mapTo]: data.data, total_count: data.count })));
  }
}

export const listResponseInterceptor = (mapTo: string) =>
  mixin(
    // tslint:disable-next-line:max-classes-per-file
    class extends ListResponseInterceptor {
      protected readonly mapTo = mapTo;
    },
  );
