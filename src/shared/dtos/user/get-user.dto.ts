import { DTO, IdParamsDto, METHOD } from "../base.dto";

export class GetUserResponseDto { }
export class GetUserParamsDto extends IdParamsDto {}

export class GetUserRequestDto extends DTO {
  public static url = "users/:id";
  public readonly responseDTOClass = GetUserResponseDto;

  public readonly url: string = GetUserRequestDto.url;
  public readonly method = METHOD.GET;

  public paramsDTO: GetUserParamsDto;
  public queryDTO: undefined;
  public bodyDTO: undefined;

  constructor(params: GetUserParamsDto) {
    super();
    this.paramsDTO = params;
  }
}