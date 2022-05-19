
import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Response } from 'express';
import { SYSTEM_MESSAGE } from 'src/shared/enums/system.enum';
import { ResponseDTO } from 'src/shared/dtos/base.dto';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const expResponse = exception.getResponse();
    const message = (typeof expResponse === 'string' ? expResponse : (expResponse as any).message) || SYSTEM_MESSAGE.SOME_THING_WENT_WRONG;
    const res: ResponseDTO<{}> = {
      data: {},
      code: status,
      message,
    }
    response
      .status(status)
      .json(res);
  }
}