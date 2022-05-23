import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from "class-transformer";
import { DTO, METHOD } from "src/shared/dtos/base.dto";

@Exclude()
export class RegisterResponseDto {
  @Expose()
  @IsNotEmpty()
  @ApiProperty()
  readonly id: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @Expose()
  readonly username: string

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  @IsOptional()
  @Expose()
  readonly email: string
}

@Exclude()
export class RegisterBodyDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @Expose()
  readonly username: string

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  @IsOptional()
  @Expose()
  readonly email: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @Expose()
  readonly password: string
}

export class RegisterRequestDto extends DTO {
  public static url = "auth/register";
  public readonly responseDTOClass = RegisterResponseDto;

  public readonly url: string = RegisterRequestDto.url;
  public readonly method = METHOD.POST;

  public paramsDTO: undefined;
  public queryDTO: undefined;
  public bodyDTO: RegisterBodyDto;

  constructor(body: RegisterBodyDto) {
    super();
    this.bodyDTO = body;
  }
}