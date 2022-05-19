import { Injectable } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from "@internal/database/schemas/user.schema";
import { CustomModel } from 'mongoose';
import { BaseService } from "@internal/database/base.service";

@Injectable()
export class UserService extends BaseService<UserDocument>{
  constructor(
    @InjectModel(User.name) private userModel: CustomModel<UserDocument>,
  ) {
    super(userModel);
  }

}