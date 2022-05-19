import { DTO, IdParamsDto, METHOD } from "../base.dto";

export class GetUsersResponseDto { }
export class GetUsersParamsDto extends IdParamsDto { }

export class GetUsersRequestDto extends DTO {
  public static url = "users";
  public readonly responseDTOClass = GetUsersResponseDto;

  public readonly url: string = GetUsersRequestDto.url;
  public readonly method = METHOD.GET;

  public paramsDTO: undefined;
  public queryDTO: undefined;
  public bodyDTO: undefined;

  constructor() {
    super();
  }
}