import { HttpException, HttpStatus } from "@nestjs/common";
import { SYSTEM_MESSAGE } from "src/shared/enums/system.enum";

export class ResourceNotFoundException extends HttpException {
  constructor() {
    super(SYSTEM_MESSAGE.RESOURCE_NOT_FOUND, HttpStatus.NOT_FOUND);
  }
}