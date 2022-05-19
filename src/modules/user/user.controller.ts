import { Controller, Post, Body, UseGuards, Get, Param, Patch, Delete } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { PaginationParams } from "mongoose";
import { Pagination } from "src/core/decorator/pagination.decorator";
import { PermissionsGuard } from "src/modules/auth/permissions/permissions.guard";
import { CreateUserBodyDto, CreateUserRequestDto, CreateUserResponseDto } from "src/shared/dtos/user/create-user.dto";
import { DeleteUserRequestDto } from "src/shared/dtos/user/delete.user.dto";
import { GetUserRequestDto } from "src/shared/dtos/user/get-user.dto";
import { GetUsersRequestDto } from "src/shared/dtos/user/get-users.dto";
import { UpdateUserBodyDto, UpdateUserRequestDto } from "src/shared/dtos/user/update-user.dto";
import { JWTContent } from "../auth/auth.decorator";
import { UserJWTPayload } from "../auth/auth.interface";
import { PermissionAction, PermissionResource } from "@internal/shared/enums/permission.enum";
import { RequiresPermission } from "../auth/permissions/permissions.decorator";
import { UserService } from "./user.service";

@Controller()
@ApiTags('users')
@UseGuards(PermissionsGuard)
export class UserController {
  constructor(private userService: UserService) { }

  @Post(CreateUserRequestDto.url)
  @RequiresPermission(PermissionResource.USERS, PermissionAction.CREATE)
  create(
    @Body() createDto: CreateUserBodyDto,
    @JWTContent(UserJWTPayload) jwtPayload: UserJWTPayload,
  ): Promise<CreateUserResponseDto> {
    return this.userService.create(createDto);
  }

  @Get(GetUsersRequestDto.url)
  @RequiresPermission(PermissionResource.USERS, PermissionAction.GET_LIST)
  findAll(
    @Pagination() params: PaginationParams,
  ) {
    return this.userService.findAll(params);
  }

  @Get(GetUserRequestDto.url)
  @RequiresPermission(PermissionResource.USERS, PermissionAction.GET_DETAIL)
  findOne(@Param('id') id: string) {
    return this.userService.findById(id);
  }

  @Patch(UpdateUserRequestDto.url)
  @RequiresPermission(PermissionResource.USERS, PermissionAction.EDIT)
  update(
    @Param('id') id: string,
    @Body() updateDto: UpdateUserBodyDto,
  ) {
    return this.userService.updateById(id, updateDto);
  }

  @Delete(DeleteUserRequestDto.url)
  @RequiresPermission(PermissionResource.USERS, PermissionAction.DELETE)
  remove(@Param('id') id: string) {
    return this.userService.removeById(id);
  }
}