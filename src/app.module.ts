import { Module } from '@nestjs/common';
import { EnvironmentModule } from './core/environment/environment.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './modules/user/user.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseInterceptor } from './core/interceptor/response.interceptor';
import { AuthModule } from './modules/auth/auth.module';
import { RoleModule } from './modules/role/role.module';
import { EnvironmentService } from './core/environment/environment.service';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [EnvironmentModule],
      useFactory: async (envService: EnvironmentService) => ({
        uri: envService.ENVIRONMENT.MONGO_URI,
        connectionFactory: (connection) => {
          connection.plugin(require('mongoose-paginate-v2'));
          connection.plugin(require('mongoose-aggregate-paginate-v2'));
          return connection;
        }
      }),
      inject: [EnvironmentService],
    }),
    EnvironmentModule,
    UserModule,
    AuthModule,
    RoleModule,
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
