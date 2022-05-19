import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { PaginationParams } from 'mongoose'

export const Pagination = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();

  let {
    paginate,
    aggregate,
  } = request.query

  const params: Partial<Mutable<PaginationParams>> = {};

  if (paginate) {
    try {
      paginate = JSON.parse(paginate);
    } catch (e) {
      paginate = undefined;
    }
    params.paginate = paginate;
    return params;
  }

  if (aggregate) {
    try {
      aggregate = JSON.parse(aggregate);
    } catch (e) {
      aggregate = undefined;
    }
    params.aggregate = aggregate;
    return params;
  }

  return params;
})
