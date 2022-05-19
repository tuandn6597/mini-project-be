import { DTO, IdParamsDto, METHOD } from "../base.dto";

export class DeleteRoleResponseDto { }

export class DeleteRoleParamsDto extends IdParamsDto {}

export class DeleteRoleRequestDto extends DTO {
  public static url = "roles/:id";
  public readonly responseDTOClass = DeleteRoleResponseDto;

  public readonly url: string = DeleteRoleRequestDto.url;
  public readonly method = METHOD.DELETE;

  public paramsDTO: DeleteRoleParamsDto;
  public queryDTO: undefined;
  public bodyDTO: undefined;

  constructor(params: DeleteRoleParamsDto) {
    super();
    this.paramsDTO = params;
  }
}