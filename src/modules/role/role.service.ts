import { Injectable } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose';
import { CustomModel } from 'mongoose';
import { Role, RoleDocument } from "@internal/database/schemas/role.schema";
import { BaseService } from "src/database/base.service";

@Injectable()
export class RoleService extends BaseService<RoleDocument>{
  constructor(
    @InjectModel(Role.name) private roleModel: CustomModel<RoleDocument>,
  ) {
    super(roleModel)
  }

  async findByUserId(userId: string): Promise<Role[]> {
    return await this.roleModel.find({ users: userId })
  }

}