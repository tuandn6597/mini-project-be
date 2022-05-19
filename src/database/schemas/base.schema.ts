import { Prop, Schema } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import { IsBoolean, IsDate } from 'class-validator';

@Schema()
export class Base {

  _id?: string;

  @Prop()
  @IsBoolean()
  public isDeleted: boolean = false

  @Prop()
  @IsBoolean()
  public isActivated: boolean = true

  @Prop()
  @Type(() => Date)
  @IsDate()
  public createdAt: Date = new Date()

  @Prop()
  @Type(() => Date)
  @IsDate()
  public updatedAt: Date = new Date()

}



