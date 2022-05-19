import { DTO, METHOD } from "../base.dto";
import { Exclude, Expose, Type } from "class-transformer";
import { IsArray, IsEnum, IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator";
import { Role } from "@internal/shared/enums/system.enum";
import { PermissionAction, PermissionEffect, PermissionResource, PermissionResourceTarget } from "@internal/shared/enums/permission.enum";
import { ApiProperty } from "@nestjs/swagger";

export class CreateRoleResponseDto { }

@Exclude()
export class PermissionDto {
  @IsEnum(PermissionResourceTarget)
  @IsNotEmpty()
  @Expose()
  resourceTarget: PermissionResourceTarget;

  @IsEnum(PermissionResource)
  @IsNotEmpty()
  @Expose()
  resourceType: PermissionResource;

  @IsEnum(PermissionAction)
  @IsNotEmpty()
  @Expose()
  action: PermissionAction

  @IsEnum(PermissionEffect)
  @IsNotEmpty()
  @Expose()
  effect: PermissionEffect
}

@Exclude()
export class CreateRoleBodyDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @Expose()
  name: string;

  @IsEnum(Role)
  @IsNotEmpty()
  @ApiProperty()
  @Expose()
  code: Role;

  @IsString({ each: true })
  @IsOptional()
  @ApiProperty()
  @Expose()
  users?: string[];

  @IsOptional()
  @ApiProperty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PermissionDto)
  @Expose()
  permissions?: PermissionDto[];
}

export class CreateRoleRequestDto extends DTO {
  public static url = "roles";
  public readonly responseDTOClass = CreateRoleResponseDto;

  public readonly url: string = CreateRoleRequestDto.url;
  public readonly method = METHOD.POST;

  public paramsDTO: undefined;
  public queryDTO: undefined;
  public bodyDTO: CreateRoleBodyDto;

  constructor(body: CreateRoleBodyDto) {
    super();
    this.bodyDTO = body;
  }
}