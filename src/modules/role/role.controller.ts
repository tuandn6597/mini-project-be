import { Controller, Post, Body, UseGuards, Get, Delete, Patch, Param } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { PermissionsGuard } from "src/modules/auth/permissions/permissions.guard";
import { CreateRoleBodyDto, CreateRoleRequestDto, CreateRoleResponseDto } from "@internal/shared/dtos/role/create-role.dto";
import { DeleteRoleRequestDto } from "@internal/shared/dtos/role/delete-role.dto";
import { GetRoleRequestDto } from "@internal/shared/dtos/role/get-role.dto";
import { GetRolesRequestDto } from "@internal/shared/dtos/role/get-roles.dto";
import { UpdateRoleBodyDto, UpdateRoleRequestDto } from "@internal/shared/dtos/role/update-role.dto";
import { PermissionAction, PermissionResource } from "@internal/shared/enums/permission.enum";
import { RequiresPermission } from "../auth/permissions/permissions.decorator";
import { RoleService } from "./role.service";
import { Pagination } from "@internal/core/decorator/pagination.decorator";
import { PaginationParams } from "mongoose";

@Controller()
@ApiTags('roles')
@UseGuards(PermissionsGuard)
export class RoleController {
  constructor(private roleService: RoleService) { }

  @Post(CreateRoleRequestDto.url)
  @RequiresPermission(PermissionResource.ROLES, PermissionAction.CREATE)
  create(@Body() createRoleDto: CreateRoleBodyDto): Promise<CreateRoleResponseDto> {
    return this.roleService.create(createRoleDto);
  }

  @Get(GetRolesRequestDto.url)
  @RequiresPermission(PermissionResource.ROLES, PermissionAction.GET_LIST)
  findAll(@Pagination() params: PaginationParams) {
    return this.roleService.findAll(params);
  }

  @Get(GetRoleRequestDto.url)
  @RequiresPermission(PermissionResource.ROLES, PermissionAction.GET_DETAIL)
  findOne(@Param('id') id: string) {
    return this.roleService.findById(id);
  }

  @Patch(UpdateRoleRequestDto.url)
  @RequiresPermission(PermissionResource.ROLES, PermissionAction.EDIT)
  update(
    @Param('id') id: string,
    @Body() updateRoleDto: UpdateRoleBodyDto,
  ) {
    return this.roleService.updateById(id, updateRoleDto);
  }

  @Delete(DeleteRoleRequestDto.url)
  @RequiresPermission(PermissionResource.ROLES, PermissionAction.DELETE)
  remove(@Param('id') id: string) {
    return this.roleService.removeById(id);
  }
}