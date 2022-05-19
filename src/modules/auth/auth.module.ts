import { Global, Module } from "@nestjs/common";
import { JwtModule, JwtModuleOptions } from "@nestjs/jwt";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./jwt.strategy";
import { PassportModule } from "@nestjs/passport";
import { EnvironmentModule } from "src/core/environment/environment.module";
import { EnvironmentService } from "src/core/environment/environment.service";
import { UserModule } from "../user/user.module";
import { RoleModule } from "../role/role.module";
import { AuthController } from "./auth.controller";
import { CryptoModule } from "src/core/crypto/crypto.module";

@Global()
@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [EnvironmentModule],
      useFactory: async (env: EnvironmentService): Promise<JwtModuleOptions> => {
        return {
          secret: env.ENVIRONMENT.JWT_SECRET,
        }
      },
      inject: [EnvironmentService],
    }),
    EnvironmentModule,
    UserModule,
    RoleModule,
    CryptoModule,
  ],
  providers: [
    AuthService,
    JwtStrategy,
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule { }
