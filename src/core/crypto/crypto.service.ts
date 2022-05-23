import { Injectable, ValueProvider } from "@nestjs/common";
import * as bcrypt from 'bcrypt';

export const CRYPTO = Symbol('CRYPTO');

@Injectable()
export class CryptoService {
  private AES = "aes-256-cbc";
  private SALT_ROUND = 10;

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