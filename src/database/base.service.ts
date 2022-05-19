import {
  AggregatePaginateOptions,
  CustomModel,
  Document,
  PaginationOptions,
  PaginationParams,
  PipelineStage,
  PopulateOptions,
} from 'mongoose'
import { ResourceNotFoundException } from 'src/core/http-exception-filter/resource-not-found-exception';
import { Base } from './schemas/base.schema';

export abstract class BaseService<T extends Document> {

  constructor(protected readonly model: CustomModel<T>) { }

  async create<P>(createDto: P): Promise<T> {
    const creating = new this.model({
      ...createDto,
      ...new Base(),
    });
    return creating.save();
  }

  async findById(id: string) {
    return this.model.findById(id);
  }

  async updateById<P>(id: string, updateDto: P): Promise<T> {
    const doc = await this.model.findById(id);
    if (!doc) {
      throw new ResourceNotFoundException();
    }
    doc.set(updateDto as Record<string, unknown>);
    return doc.save();
  }

  async removeById(_id: string): Promise<T> {
    const doc = await this.model.findById(_id);
    if (!doc) {
      throw new ResourceNotFoundException();
    }
    doc.set({
      isDeleted: true,
    });
    return doc.save();
  }

  async paginate(query: Record<string, any> = {}, options?: Partial<PaginationOptions>) {
    return this.model.paginate(query, options);
  }

  async aggregatePaginate(pipes: PipelineStage[] = [], options?: AggregatePaginateOptions) {
    const aggregate = this.model.aggregate(pipes);
    return this.model.aggregatePaginate(aggregate, options);
  }

  async findAll(params: PaginationParams) {
    if (params.aggregate) {
      return this.aggregatePaginate(params.aggregate.pipes, params.aggregate.options);
    }
    return this.paginate(params.paginate?.query, params.paginate?.options);
  }

  async findOne(
    conditions: Record<string, any>,
    selectFields?: string,
    populate?: string | string[],
  ) {
    return this.model
      .findOne(conditions)
      .populate(populate)
      .select(selectFields)
      .exec()
  }

}
