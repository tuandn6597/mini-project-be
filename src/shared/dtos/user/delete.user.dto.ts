import { DTO, IdParamsDto, METHOD } from "../base.dto";

export class DeleteUserResponseDto { }
export class DeleteUserParamsDto extends IdParamsDto {}

export class DeleteUserRequestDto extends DTO {
  public static url = "users/:id";
  public readonly responseDTOClass = DeleteUserResponseDto;

  public readonly url: string = DeleteUserRequestDto.url;
  public readonly method = METHOD.DELETE;

  public paramsDTO: DeleteUserParamsDto;
  public queryDTO: undefined;
  public bodyDTO: undefined;

  constructor(params: DeleteUserParamsDto) {
    super();
    this.paramsDTO = params;
  }
}