import { IsEmpty, IsNumber, IsString } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';
import { Base } from 'src/shared/schemas/base.schema';
import { IUser } from './user.interface';

@Exclude()
export class User extends Base implements IUser {

  @IsString()
  @IsEmpty()
  @Expose()
  username: string;

  @IsString()
  @IsEmpty()
  @Expose()
  email: string;

  @IsString()
  @IsEmpty()
  @Expose({ toClassOnly: true })
  password: string;

  @IsNumber()
  @Expose()
  balance: number = 500000;

}
