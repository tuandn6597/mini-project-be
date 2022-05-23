import { DTO, METHOD } from "../../../shared/dtos/base.dto";
import { Exclude, Expose, Type } from "class-transformer";
import { IsArray, IsNotEmpty, IsNumber, IsString, ValidateNested } from "class-validator";
@Exclude()
export class CardItemDto {
  @IsString()
  @IsNotEmpty()
  @Expose()
  id: string;

  @IsNumber()
  @Expose()
  amount: number;
}

export class PaymentResponseDto { }

@Exclude()
export class PaymentBodyDto {

  @IsArray()
  @Expose()
  @ValidateNested()
  @Type(() => CardItemDto)
  cardItems: CardItemDto[];

}

export class PaymentRequestDto extends DTO {
  public static url = "users/payment";
  public readonly responseDTOClass = PaymentResponseDto;

  public readonly url: string = PaymentRequestDto.url;
  public readonly method = METHOD.POST;

  public paramsDTO: undefined;
  public queryDTO: undefined;
  public bodyDTO: PaymentBodyDto;

  constructor(body: PaymentBodyDto) {
    super();
    this.bodyDTO = body;
  }
}