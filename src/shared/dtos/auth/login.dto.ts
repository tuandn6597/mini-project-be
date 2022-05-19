import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';
import { DTO, METHOD, ResponseTokenDTO } from "../base.dto";
import { Exclude, Expose } from "class-transformer";

export class LoginResponseDto extends ResponseTokenDTO {}

@Exclude()
export class LoginBodyDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  @Expose()
  readonly email: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @Expose()
  readonly password: string
}

export class LoginRequestDto extends DTO {
  public static url = "auth/login";
  public readonly responseDTOClass = LoginResponseDto;

  public readonly url: string = LoginRequestDto.url;
  public readonly method = METHOD.POST;

  public paramsDTO: undefined;
  public queryDTO: undefined;
  public bodyDTO: LoginBodyDto;

  constructor(body: LoginBodyDto) {
    super();
    this.bodyDTO = body;
  }
}