import { Expose, Type } from 'class-transformer';
import { IsBoolean, IsDate, IsString } from 'class-validator';

export class Base {

  @IsString()
  @Expose()
  public id: string;

  @IsBoolean()
  @Expose()
  public isDeleted: boolean = false

  @IsBoolean()
  @Expose()
  public isActivated: boolean = true

  @Type(() => Date)
  @IsDate()
  @Expose()
  public createdAt: Date = new Date()

  @Type(() => Date)
  @IsDate()
  @Expose()
  public updatedAt: Date = new Date()

}



