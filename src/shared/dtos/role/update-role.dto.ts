import { PartialType } from "@nestjs/mapped-types";
import { DTO, IdParamsDto, METHOD } from "../base.dto";
import { CreateRoleBodyDto } from "./create-role.dto";
export class UpdateRoleResponseDto { }
export class UpdateRoleBodyDto extends PartialType(CreateRoleBodyDto) {}
export class UpdateRoleParamsDto extends IdParamsDto { }

export class UpdateRoleRequestDto extends DTO {
  public static url = "roles/:id";
  public readonly responseDTOClass = UpdateRoleResponseDto;

  public readonly url: string = UpdateRoleRequestDto.url;
  public readonly method = METHOD.PUT;

  public paramsDTO: UpdateRoleParamsDto;
  public queryDTO: undefined;
  public bodyDTO: UpdateRoleBodyDto;

  constructor(params: UpdateRoleParamsDto, body: UpdateRoleBodyDto) {
    super();
    this.paramsDTO = params;
    this.bodyDTO = body;
  }
}