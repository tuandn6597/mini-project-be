import { Test } from '@nestjs/testing';
import { ProductController } from '../modules/products/product.controller';
import { ProductService } from '../modules/products/product.service';
import { products } from '../modules/products/products.data';

describe('ProductController', () => {
  let productController: ProductController;
  let productService: ProductService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
        controllers: [ProductController],
        providers: [ProductService],
      }).compile();

      productService = moduleRef.get<ProductService>(ProductService);
      productController = moduleRef.get<ProductController>(ProductController);
  });

  describe('getAll', () => {
    it('should return an array of products', async () => {
      const result = products;
      jest.spyOn(productService, 'findAll').mockImplementation(() => result);

      expect(await productController.getAll()).toBe(result);
    });
  });
});