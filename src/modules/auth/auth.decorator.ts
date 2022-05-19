import { createParamDecorator, ExecutionContext, ForbiddenException, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { SYSTEM_MESSAGE } from "src/shared/enums/system.enum";
import { JWTPayload, TOKEN_TYPE_MAP } from "./auth.interface";

function extractToken<T extends JWTPayload>(tokenType: Constructor<T>, jwtPayload: T): T | never {
  if (!tokenType) {
    throw new InternalServerErrorException("Wrong token type implementation");
  }
  if (!jwtPayload) {
    throw new UnauthorizedException();
  }
  const isSubTokenType = tokenType === TOKEN_TYPE_MAP[jwtPayload.type]
    || tokenType.isPrototypeOf(TOKEN_TYPE_MAP[jwtPayload.type]);
  if (!isSubTokenType) {
    throw new ForbiddenException(SYSTEM_MESSAGE.TOKEN_IS_INVALID);
  }
  return jwtPayload;
}

export const JWTContent =
  createParamDecorator(<T extends JWTPayload>(tokenType: Constructor<T>, ctx: ExecutionContext): T => {
    const req = ctx.switchToHttp().getRequest();
    return extractToken(tokenType, req.user);
  });