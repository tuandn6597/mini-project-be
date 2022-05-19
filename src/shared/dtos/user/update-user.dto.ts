import { DTO, METHOD } from "../base.dto";
import { PartialType } from "@nestjs/mapped-types";
import { CreateUserBodyDto } from "./create-user.dto";

export class UpdateUserResponseDto { }

export class UpdateUserBodyDto extends PartialType(CreateUserBodyDto) { }

export class UpdateUserRequestDto extends DTO {
  public static url = "users";
  public readonly responseDTOClass = UpdateUserResponseDto;

  public readonly url: string = UpdateUserRequestDto.url;
  public readonly method = METHOD.PATCH;

  public paramsDTO: undefined;
  public queryDTO: undefined;
  public bodyDTO: UpdateUserBodyDto;

  constructor(body: UpdateUserBodyDto) {
    super();
    this.bodyDTO = body;
  }
}