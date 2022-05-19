import { DTO, METHOD } from "../base.dto";

export class GetRolesResponseDto { }
export class GetRolesRequestDto extends DTO {
  public static url = "roles";
  public readonly responseDTOClass = GetRolesResponseDto;

  public readonly url: string = GetRolesRequestDto.url;
  public readonly method = METHOD.GET;

  public paramsDTO: undefined;
  public queryDTO: undefined;
  public bodyDTO: undefined;

  constructor() {
    super();
  }
}