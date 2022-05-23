import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';
import { Base } from 'src/shared/schemas/base.schema';
import { IProduct } from './product.interface';

@Exclude()
export class Product extends Base implements IProduct {

  @Expose()
  @IsString()
  string: number;

  @Expose()
  @IsString()
  @IsNotEmpty()
  image: string;

  @Expose()
  @IsNumber()
  price: number;

  @Expose()
  @IsString()
  @IsNotEmpty()
  description: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  title: string;
}
