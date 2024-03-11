import { ProductOrder } from "../../entities/product-order";
import { IProductOrder } from "../../../domain/models/product-order";
import { NotFoundException } from "../../../shared/exceptions/not-found.exception";
import { IProductOrderRepository, IRepository } from "../contracts/repository.base";
import { User } from "../../entities/user";

export class ProductOrderRepository
  implements IProductOrderRepository
{
  /**
   *
   */
  constructor() {}

  async createManyOrders(productOrders: IProductOrder[]): Promise<ProductOrder[]> {
    try {
      const createdOrders = await ProductOrder.bulkCreate(productOrders);
      return createdOrders;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Receives a ProductOrder as parameter
   * @productOrder
   * returns void
   */
  async create(productOrder: IProductOrder): Promise<ProductOrder> {
    try {
      return await ProductOrder.create<ProductOrder>({ ...productOrder });
    } catch (error) {
      throw error;
    }
  }

  /**
   * Receives a String as parameter
   * @id
   * returns ProductOrder
   */
  async findById(id: string): Promise<ProductOrder | null> {
    try {
      const productOrderItem = await ProductOrder.findByPk(id);

      if (!productOrderItem) {
        throw new NotFoundException("ProductOrder", id);
      }
      return productOrderItem;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Receives a String as parameter
   * @name
   * returns ProductOrder
   */
  async findByName(name: string): Promise<ProductOrder | null> {
    try {
      const productOrderItem = await ProductOrder.findOne({
        include: [User],
      });
      return productOrderItem;
    } catch (error) {
      throw error;
    }
  }

  /*
   * Returns an array of ProductOrder
   */
  async getAll(): Promise<ProductOrder[]> {
    try {
      const productOrders = await ProductOrder.findAll();
      return productOrders;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Receives a ProductOrder as parameter
   * @productOrder
   * returns void
   */
  async update(productOrder: IProductOrder): Promise<ProductOrder> {
    const { orderId } = productOrder;
    try {
      const productOrderItem: any = await ProductOrder.findByPk(orderId);

      console.log(productOrder);
      if (!productOrderItem) {
        throw new NotFoundException("ProductOrder", orderId.toString());
      }

      return await productOrderItem.update({ ...productOrder });
    } catch (error) {
      throw error;
    }
  }

  /**
   * Receives a string as parameter
   * @id
   * returns void
   */
  async delete(id: string): Promise<void> {
    try {
      const productOrderItem = await ProductOrder.findByPk(id);

      if (!productOrderItem) {
        throw new NotFoundException("ProductOrder", id);
      }

      await productOrderItem.destroy({
        force: true,
      });
    } catch (error) {
      throw error;
    }
  }
}
