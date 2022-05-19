import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { Base } from './base.schema';
import { IsEmpty, IsString } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';
import { IRole } from '@internal/shared/interfaces/role.interface';
import { User } from './user.schema';
import { Permission } from '@internal/shared/types/permission.type';

export type RoleDocument = Role & Document;

@Schema({ autoIndex: true })
@Exclude()
export class Role extends Base implements IRole {

  @Prop()
  @IsString()
  @IsEmpty()
  @Expose()
  name: string;

  @Prop({ index: true, unique: true })
  @IsString()
  @IsEmpty()
  @Expose()
  code: string;

  @Prop({ type: [{ type: SchemaTypes.ObjectId, ref: User.name }] })
  @Expose()
  users: User[];

  @Prop({ default: [] })
  @Expose()
  permissions: Permission[];

}

export const RoleSchema = SchemaFactory.createForClass(Role);
