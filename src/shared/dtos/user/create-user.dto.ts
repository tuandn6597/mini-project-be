import { DTO, METHOD } from "../base.dto";
import { Exclude, Expose } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserResponseDto { }

@Exclude()
export class CreateUserBodyDto {
 
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @Expose()
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @Expose()
  password: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @Expose()
  username: string;
}

export class CreateUserRequestDto extends DTO {
  public static url = "users";
  public readonly responseDTOClass = CreateUserResponseDto;

  public readonly url: string = CreateUserRequestDto.url;
  public readonly method = METHOD.POST;

  public paramsDTO: undefined;
  public queryDTO: undefined;
  public bodyDTO: CreateUserBodyDto;

  constructor(body: CreateUserBodyDto) {
    super();
    this.bodyDTO = body;
  }
}