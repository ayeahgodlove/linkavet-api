import { Order } from "../../data/entities/order";
import { Product } from "../../data/entities/product";
import { IOrderRepository } from "../../data/repositories/contracts/repository.base";
import { NotFoundException } from "../../shared/exceptions/not-found.exception";
import { IOrder } from "../models/order";

export class OrderUseCase {
  /**
   *
   */
  constructor(private readonly orderRepository: IOrderRepository) {}

  async createOrder(order: IOrder): Promise<Order> {
    const existingOrder = await this.orderRepository.findByOrderNo(
      order.orderNo
    );

    if (existingOrder) {
      throw new NotFoundException("Order", order.orderNo);
    }

    // const _order = new Order({order});
    //because it's already done in the Repository
    return this.orderRepository.create(order);
  }

  async getAll(): Promise<Order[]> {
    return this.orderRepository.getAll();
  }

  async getOrderById(id: string): Promise<Order | null> {
    return this.orderRepository.findById(id);
  }

  async getOrderByOrderNo(orderId: string): Promise<Order | null> {
    const _order = await this.orderRepository.findByOrderNo(orderId);

    if (!_order) {
      return null;
    }

    return _order;
  }

  async updateOrder(order: IOrder): Promise<Order> {
    return this.orderRepository.update(order);
  }

  async deleteOrder(id: string): Promise<void> {
    return this.orderRepository.delete(id);
  }

  async updateProducts(products: any[]): Promise<void> {
    return this.orderRepository.updateProductTable(products);
  }
}
