import { CardItemDto } from "./dtos/payment.dto";

export interface IUser {
  id: string;
  email: string;
  password: string;
  username: string;
}

export enum TransactionStatus {
  FAILED = 'FAILED',
  SUCCEED = 'SUCCEED'
}

export interface ITransaction {
  userId: string;
  cardItems: CardItemDto[];
  status: TransactionStatus;
  createdAt: Date;
}