import { HttpException, HttpStatus } from "@nestjs/common";
import { SYSTEM_MESSAGE } from "src/shared/enums/system.enum";

export class NotEnoughMoneyException extends HttpException {
  constructor() {
    super(SYSTEM_MESSAGE.NOT_ENOUGH_MONEY, HttpStatus.BAD_REQUEST);
  }
}