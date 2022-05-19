import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { LoginBodyDto, LoginRequestDto } from "@internal/shared/dtos/auth/login.dto";
import { RegisterBodyDto, RegisterRequestDto } from "@internal/shared/dtos/auth/register.dto";
import { AuthService } from "./auth.service";

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