import { Injectable, ValueProvider } from "@nestjs/common";
import {
  createCipheriv,
  createDecipheriv,
} from "crypto";
import * as bcrypt from 'bcrypt';

export const CRYPTO = Symbol('CRYPTO');

@Injectable()
export class CryptoService {
  private AES = "aes-256-cbc";
  private SALT_ROUND = 10;

  public encryptAES(buffer: Buffer, password: string): Buffer {
    const cipher = createCipheriv(this.AES,
      Buffer.alloc(32, password, "utf8"),
      Buffer.alloc(16, password, "utf8"),
    );
    return Buffer.concat([cipher.update(buffer), cipher.final()]);
  }

  public decryptAES(buffer: Buffer, password: string): Buffer {
    const decipher = createDecipheriv(this.AES,
      Buffer.alloc(32, password, "utf8"),
      Buffer.alloc(16, password, "utf8"),
    );
    return Buffer.concat([decipher.update(buffer), decipher.final()]);
  }

  public generateBcryptHash = async (password: string) => {
    const salt = await bcrypt.genSalt(this.SALT_ROUND);
    return bcrypt.hash(password, salt);
  }

  public async comparePassword(paramsPassword: string, password: string) {
    return bcrypt.compare(paramsPassword, password);
  }

}

export const CryptoProvider: ValueProvider<CryptoService> = {
  provide: CRYPTO,
  useValue: new CryptoService(),
}