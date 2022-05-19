import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Base } from './base.schema';
import { IsEmpty, IsString } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';
import { IUser } from '@internal/shared/interfaces/user.interface';
import { CryptoProvider } from '@internal/core/crypto/crypto.service';

export type UserDocument = User & Document;

@Schema({autoIndex: true})
@Exclude()
export class User extends Base implements IUser {

  @Prop()
  @IsString()
  @IsEmpty()
  @Expose()
  username: string;

  @Prop({ index: true, unique: true })
  @IsString()
  @IsEmpty()
  @Expose()
  email: string;

  @Prop()
  @IsString()
  @IsEmpty()
  @Expose({ toClassOnly: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', async function (next) {
  const user: any = this;
  if (!user.isModified('password')) {
    return next();
  }

  try {
    user.password = await CryptoProvider.useValue.generateBcryptHash(user.password);
    await next();
  } catch (e) {
    await next(e);
  }
})
