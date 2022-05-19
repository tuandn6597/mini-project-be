import { Injectable, NestInterceptor, ExecutionContext, CallHandler, HttpException, HttpStatus } from '@nestjs/common';
import { catchError, map, Observable } from 'rxjs';
import { of } from 'rxjs/internal/observable/of';
import { ResponseDTO } from 'src/shared/dtos/base.dto';
import { SYSTEM_MESSAGE } from "src/shared/enums/system.enum";

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, ResponseDTO<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<ResponseDTO<any>> {
    const response = context.switchToHttp().getResponse();
    return next
      .handle()
      .pipe(
        map(data => {
          if (data instanceof ResponseDTO) {
            response.status(data.code);
            return data;
          }
          const statusCode = response.statusCode || response.status || HttpStatus.OK;
          response.status(statusCode);
          return {
            data,
            code: statusCode,
            message: response.message || SYSTEM_MESSAGE.SUCCEED,
          }
        }),
        catchError((err: HttpException | Error) => {
          let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
          let message: string | SYSTEM_MESSAGE = SYSTEM_MESSAGE.SOME_THING_WENT_WRONG;
          if (err instanceof HttpException) {
            statusCode = err.getStatus();
            const msg = err.getResponse();
            message = typeof msg === 'string' ? msg : JSON.stringify((msg as any).message);
          } else {
            statusCode = response.statusCode;
            message = response.message || err.message;
          }
          response.status(statusCode);
          return of({
            data: {},
            code: statusCode,
            message,
          })
        })

      );
  }
}