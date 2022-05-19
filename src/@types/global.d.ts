import { Model } from "mongoose";

export { };

declare global {
  /**
   * Now declare things that go in the global namespace,
   * or augment existing declarations in the global namespace.
   */
  type Constructor<T> = new (...args: any[]) => T;
  type Mutable<T> = { -readonly [P in keyof T]: T[P] }

}
declare module 'mongoose' {
  import { Document, Model } from 'mongoose';

  export interface PaginationParams {
    paginate?: {
      query: Record<string, any>,
      options?: Partial<PaginationOptions>,
    },
    aggregate?: {
      pipes: PipelineStage[],
      options?: AggregatePaginateOptions,
    }
  }

  export interface PaginationOptions {
    select: Record<string, any> | string;
    collation: Record<string, any>;
    sort: Record<string, any> | string;
    populate: Array | Record<string, any> | string;
    projection: Record<string, any> | string;
    lean: boolean;
    leanWithId: boolean;
    offset: number;
    limit: number;
    page: number;
    customLabels: Record<string, any>;
    pagination: boolean;
    useEstimatedCount: boolean; 
    useCustomCountFn: boolean;
    forceCountFn: boolean;
    allowDiskUse: boolean;
  }

  export interface PaginationResult<T> {
    docs: T[]
    totalDocs: number
    limit: number
    hasPrevPage: boolean
    hasNextPage: boolean
    page: number
    totalPages: number
    offset: number
    prevPage: number
    nextPage: number
    pagingCounter: number
    meta: Record<string, any>
  }

  export type AggregatePaginateOptions = Partial<Pick<PaginationOptions, 'sort' | 'offset' | 'limit' | 'page' | 'customLabels' | 'pagination' | 'allowDiskUse'> & { countQuery?: Record<string, any>, useFacet?: boolean }>;

  export interface CustomModel<T extends Document, QueryHelpers = {}>
    extends Model<T, QueryHelpers> {
    paginate(
      query: Record<string, any> = {},
      options?: Partial<PaginationOptions>,
      callback?: (err, result) => void
    ): PaginationResult<T>

    aggregate(pipes: PipelineStage[]): Aggregate;
    aggregatePaginate(aggregate: Aggregate, options?: AggregatePaginateOptions) : PaginationResult<T>

  };
}
