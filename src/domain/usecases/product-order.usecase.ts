import { ProductOrder } from "../../data/entities/product-order";
import { IProductOrderRepository } from "../../data/repositories/contracts/repository.base";
import { IProductOrder } from "../models/product-order";

export class ProductOrderUseCase {
  /**
   *
   */
  constructor(
    private readonly productOrderRepository: IProductOrderRepository
  ) {}

  async createManyOrders(productOrders: IProductOrder[]): Promise<ProductOrder[]> {
    return this.productOrderRepository.createManyOrders(productOrders);
  }

  async createProductOrder(productOrder: IProductOrder): Promise<ProductOrder> {
    return this.productOrderRepository.create(productOrder);
  }

  async getAll(): Promise<ProductOrder[]> {
    return this.productOrderRepository.getAll();
  }

  async getProductOrderById(id: string): Promise<ProductOrder | null> {
    return this.productOrderRepository.findById(id);
  }

  async updateProductOrder(productOrder: IProductOrder): Promise<ProductOrder> {
    return this.productOrderRepository.update(productOrder);
  }

  async deleteProductOrder(id: string): Promise<void> {
    return this.productOrderRepository.delete(id);
  }
}
