import { ForbiddenException, Injectable, UnauthorizedException } from "@nestjs/common";
import { classToPlain, plainToClass } from "class-transformer";
import { EnvironmentService } from "@internal/core/environment/environment.service";
import { SYSTEM_MESSAGE } from "src/shared/enums/system.enum";
import { JWTPayload, TOKEN_TYPE_MAP, UserJWTPayload } from "./auth.interface";
import { JwtService } from "@nestjs/jwt";
import { validateOrReject } from "class-validator";
import { UserService } from "../user/user.service";
import { RoleService } from "../role/role.service";
import { RegisterBodyDto, RegisterResponseDto } from "src/shared/dtos/auth/register.dto";
import { UserExistedException } from "src/core/http-exception-filter/user-exist-exception";
import { User } from "src/database/schemas/user.schema";
import { LoginBodyDto, LoginResponseDto } from "src/shared/dtos/auth/login.dto";
import { ResourceNotFoundException } from "src/core/http-exception-filter/resource-not-found-exception";
import { CryptoService } from "src/core/crypto/crypto.service";
import { Profile } from "src/shared/types/profile.type";

@Injectable()
export class AuthService {

  constructor(
    private readonly jwtService: JwtService,
    private readonly envService: EnvironmentService,
    private readonly userService: UserService,
    private readonly roleService: RoleService,
    private readonly cryptoService: CryptoService,
  ) {
  }

  public async signJWTToken(content: JWTPayload, expiresIn: number = this.envService.ENVIRONMENT.TOKEN_EXPIRE): Promise<string> {
    await this.validatePayload(content);
    return this.jwtService.sign(classToPlain(content), {
      audience: this.envService.ENVIRONMENT.JWT_ISSUER,
      subject: this.envService.ENVIRONMENT.JWT_ISSUER,
      issuer: this.envService.ENVIRONMENT.JWT_ISSUER,
      expiresIn,
    });
  }

  public async validatePayload(payload: JWTPayload): Promise<JWTPayload> {
    const parsedPayload = plainToClass(
      TOKEN_TYPE_MAP[payload.type] as Constructor<JWTPayload>,
      payload,
    );
    if (!(parsedPayload instanceof TOKEN_TYPE_MAP[parsedPayload.type])) {
      throw new UnauthorizedException(SYSTEM_MESSAGE.TOKEN_IS_INVALID);
    }
    try {
      await validateOrReject(parsedPayload);
    } catch (error) {
      throw new UnauthorizedException(JSON.stringify(error));
    }
    return parsedPayload;
  }

  public async validate(payload: JWTPayload): Promise<Profile> {
    const user = await this.userService.findById(payload.userId);
    if (!user) {
      throw new ForbiddenException();
    }
    const roles = await this.roleService.findByUserId(user._id);
    return {
      user,
      roles,
    };
  }

  async register(dto: RegisterBodyDto): Promise<RegisterResponseDto> {
    const condition = {
      email: dto.email,
    }
    const userExisted = await this.userService.findOne(condition);
    if (userExisted) {
      throw new UserExistedException();
    }
    const userEntity = await this.userService.create(plainToClass(User, dto));
    return {
      userId: userEntity._id,
    }
  }

  async login(dto: LoginBodyDto): Promise<LoginResponseDto> {
    const condition = {
      email: dto.email,
    }
    const userExisted = await this.userService.findOne(condition);
    if (!userExisted) {
      throw new ResourceNotFoundException();
    }
    const isValidPass = await this.cryptoService.comparePassword(dto.password, userExisted.password);
    if (!isValidPass) {
      throw new ForbiddenException();
    }
    const jwtPayload = new UserJWTPayload();
    jwtPayload.userId = String(userExisted._id);
    const token = await this.signJWTToken(jwtPayload);
    /** TODO: implement refresh token */
    return {
      token,
      refreshToken: token,
    };
  }
}