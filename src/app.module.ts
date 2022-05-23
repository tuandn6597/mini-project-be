import { Module } from '@nestjs/common';
import { EnvironmentModule } from './core/environment/environment.module';
import { UserModule } from './modules/user/user.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseInterceptor } from './core/interceptor/response.interceptor';
import { AuthModule } from './modules/auth/auth.module';
import { ProductModule } from './modules/products/product.module';

@Module({
  imports: [
    EnvironmentModule,
    UserModule,
    AuthModule,
    ProductModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    }
  ],
})
export class AppModule { }
