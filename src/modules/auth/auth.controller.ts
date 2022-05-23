import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { LoginBodyDto, LoginRequestDto } from "src/modules/auth/dtos/login.dto";
import { AuthService } from "./auth.service";
import { RegisterBodyDto, RegisterRequestDto } from "./dtos/register.dto";

@Controller()
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post(RegisterRequestDto.url)
  register(@Body() dto: RegisterBodyDto) {
    return this.authService.register(dto);
  }

  @Post(LoginRequestDto.url)
  login(@Body() dto: LoginBodyDto) {
    return this.authService.login(dto);
  }
}