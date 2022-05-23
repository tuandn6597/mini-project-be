import { ForbiddenException, Injectable, UnauthorizedException } from "@nestjs/common";
import { classToPlain, plainToClass } from "class-transformer";
import { EnvironmentService } from "@internal/core/environment/environment.service";
import { SYSTEM_MESSAGE } from "src/shared/enums/system.enum";
import { JWTPayload, TOKEN_TYPE_MAP, UserJWTPayload } from "./auth.interface";
import { JwtService } from "@nestjs/jwt";
import { validateOrReject } from "class-validator";
import { UserService } from "../user/user.service";
import { UserExistedException } from "src/core/http-exception-filter/user-exist-exception";
import { LoginBodyDto, LoginResponseDto } from "src/modules/auth/dtos/login.dto";
import { ResourceNotFoundException } from "src/core/http-exception-filter/resource-not-found-exception";
import { CryptoService } from "src/core/crypto/crypto.service";
import { RegisterBodyDto, RegisterResponseDto } from "./dtos/register.dto";
import { User } from "../user/user.schema";
import { makeId } from "src/shared/utils/make-id";

@Injectable()
export class AuthService {

  constructor(
    private readonly jwtService: JwtService,
    private readonly envService: EnvironmentService,
    private readonly userService: UserService,
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

  public async validate(payload: JWTPayload) {
    const user = await this.userService.findById(payload.userId);
    if (!user) {
      throw new ForbiddenException();
    }
    return user.id;
  }

  async register(dto: RegisterBodyDto): Promise<RegisterResponseDto> {
    const userExisted = await this.userService.findByEmail(dto.email);
    if (userExisted) {
      throw new UserExistedException();
    }
    const password = await this.cryptoService.generateBcryptHash(dto.password);
    const id = makeId();
    const user = new User();
    const userEntity = await this.userService.create({ ...user, ...dto, password, id });
    console.log({ ...user, ...dto, password, id });
    return {
      id: userEntity.id,
      email: userEntity.email,
      username: userEntity.username,
    }
  }

  async login(dto: LoginBodyDto): Promise<LoginResponseDto> {
    const userExisted = await this.userService.findByEmail(dto.email);
    if (!userExisted) {
      throw new ResourceNotFoundException();
    }
    const isValidPass = await this.cryptoService.comparePassword(dto.password, userExisted.password);
    if (!isValidPass) {
      throw new ForbiddenException();
    }
    const jwtPayload = new UserJWTPayload();
    jwtPayload.userId = String(userExisted.id);
    const token = await this.signJWTToken(jwtPayload);
    /** TODO: ko yêu cầu implement refresh token */
    return {
      token,
      refreshToken: token,
    };
  }
}