import { Injectable, Logger } from "@nestjs/common";
import { NotEnoughMoneyException } from "src/core/http-exception-filter/not-enough-money.exception";
import { ResourceNotFoundException } from "src/core/http-exception-filter/resource-not-found-exception";
import { ProductService } from "../products/product.service";
import { PaymentBodyDto } from "./dtos/payment.dto";
import { ITransaction, TransactionStatus } from "./user.interface";
import { User } from "./user.schema";

export let users: User[] = [{
  isDeleted: false,
  isActivated: true,
  createdAt: new Date(),
  updatedAt: new Date(),
  balance: 500000,
  email: 'tuandn6597@gmail.com',
  password: '$2b$10$t1jBqEQuUWJ6YhXVrtYN/uRBVNcM/5w8uhKRAGoTRv.TaDTE50CdG',
  username: 'tuandn65',
  id: 'JWjuF6FuBW'
}];
export const transactions: ITransaction[] = [];
@Injectable()
export class UserService {
  private logger = new Logger()
  constructor(private readonly productService: ProductService) { }
  async findById(id: string) {
    return users.find(user => user.id === id);
  }
  async findByEmail(email: string) {
    return users.find(user => user.email === email);
  }
  async create(user: User): Promise<User> {
    users.push(user)
    return user;
  }
  async updateById(userId: string, dto: Partial<User>) {
    const user = await this.findById(userId);
    if (!user) {
      throw new ResourceNotFoundException();
    }
    users = users.map(item => {
      if (item.id === userId) {
        return {
          ...item,
          ...dto
        }
      }
      return item;
    })
    return users;
  }
  async findAll() {
    return users;
  }

  calculateTotal(items: ({ price: number, amount: number })[]) {
    return items.reduce((acc: number, item) => acc + item.amount * item.price, 0);
  }

  async payment(userId: string, dto: PaymentBodyDto) {
    let status;
    try {
      /** start transaction */
      const user = await this.findById(userId);
      if (!user) {
        throw new ResourceNotFoundException();
      }
      const cardItems = await Promise.all(dto.cardItems.map(async item => {
        const product = await this.productService.findById(item.id);
        return {
          amount: item.amount,
          price: product.price,
        }
      }))
      const totalAmount = this.calculateTotal(cardItems);
      if (!(user.balance > totalAmount)) {
        throw new NotEnoughMoneyException()
      }
      /** trừ tiền */
      const userUpdated = await this.updateById(userId, { balance: user.balance - totalAmount });
      this.logger.log('userUpdated:', JSON.stringify(userUpdated))
      /** ghi lịch sử */
      return status = TransactionStatus.SUCCEED
      /** commit */
    } catch (error) {
      return status = TransactionStatus.FAILED
      /** rollback */
    } finally {   
      transactions.push({
        userId,
        cardItems: dto.cardItems,
        status,
        createdAt: new Date()
      })
    }
  }
}