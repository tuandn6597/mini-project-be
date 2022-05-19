import { DTO, IdParamsDto, METHOD } from "../base.dto";

export class GetRoleResponseDto { }
export class GetRoleParamsDto extends IdParamsDto { }
export class GetRoleRequestDto extends DTO {
  public static url = "roles/:id";
  public readonly responseDTOClass = GetRoleResponseDto;

  public readonly url: string = GetRoleRequestDto.url;
  public readonly method = METHOD.GET;

  public paramsDTO: GetRoleParamsDto;
  public queryDTO: undefined;
  public bodyDTO: undefined;

  constructor(params: GetRoleParamsDto) {
    super();
    this.paramsDTO = params;
  }
}