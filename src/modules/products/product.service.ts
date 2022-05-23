import { Injectable } from "@nestjs/common";
import { IProduct } from "./product.interface";
import { products } from "./products.data";

@Injectable()
export class ProductService {
  findAll(): IProduct[] {
    return products;
  }
  async findById(id: string) {
    return products.find(item => item.id === id);
  }
}