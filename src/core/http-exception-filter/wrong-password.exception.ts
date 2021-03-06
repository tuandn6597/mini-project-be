import { HttpException, HttpStatus } from "@nestjs/common";
import { SYSTEM_MESSAGE } from "src/shared/enums/system.enum";

export class UserExistedException extends HttpException {
  constructor() {
    super(SYSTEM_MESSAGE.WRONG_PASSWORD, HttpStatus.FORBIDDEN);
  }
}