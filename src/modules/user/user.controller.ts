import { Body, Controller, Post, Request, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { PaymentBodyDto, PaymentRequestDto } from "./dtos/payment.dto";
import { UserService } from "./user.service";

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) { }
  @Post(PaymentRequestDto.url)
  @UseGuards(JwtAuthGuard)
  payment(
    @Request() req,
    @Body() paymentDto: PaymentBodyDto) {
    return this.userService.payment(req.user, paymentDto);
  }
}