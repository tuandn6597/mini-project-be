import { Module } from '@nestjs/common';
import { ProductModule } from '../products/product.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    ProductModule,
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule { }