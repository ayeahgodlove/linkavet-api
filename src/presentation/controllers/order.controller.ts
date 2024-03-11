import { Request, Response } from "express";
import { IOrder, IOrderResponse, emptyOrder } from "../../domain/models/order";
import { OrderUseCase } from "../../domain/usecases/order.usecase";
import { OrderRepository } from "../../data/repositories/impl/order.repository";
import { OrderRequestDto } from "../dtos/order-request.dto";
import { validate } from "class-validator";
import { displayValidationErrors } from "../../utils/displayValidationErrors";
import { NotFoundException } from "../../shared/exceptions/not-found.exception";
import { OrderMapper, ProductMapper } from "../mappers/mapper";
import { ProductOrderRepository } from "../../data/repositories/impl/product-order.repository";
import { ProductOrderUseCase } from "../../domain/usecases/product-order.usecase";
import {
  IProductOrder,
  emptyProductOrder,
} from "../../domain/models/product-order";
import { sendOrderConfirmation } from "../../utils/email";
import { IProductResponse } from "../../domain/models/product";

const orderRepository = new OrderRepository();
const orderUseCase = new OrderUseCase(orderRepository);
const orderMapper = new OrderMapper();
const productMapper = new ProductMapper();

const productOrderRepository = new ProductOrderRepository();
const productOrderUseCase = new ProductOrderUseCase(productOrderRepository);

export class OrdersController {
  async createOrder(
    req: Request,
    res: Response<IOrderResponse>
  ): Promise<void> {
    const dto = new OrderRequestDto(req.body);
    const validationErrors = await validate(dto);

    if (validationErrors.length > 0) {
      res.status(400).json({
        validationErrors: displayValidationErrors(validationErrors) as any,
        success: false,
        data: null,
        message: "Attention!",
      });
    } else {
      try {
        const orderResponse = await orderUseCase.createOrder(dto.toData());
        const products: any[] = req.body.products;

        const productOrdersVm: IProductOrder[] = products.map((p) => {
          return {
            ...emptyProductOrder,
            ...p,
            orderId: orderResponse.dataValues.id,
          };
        });
        await productOrderUseCase.createManyOrders(productOrdersVm);

        const productsData = await orderResponse.$get("products");
        await sendOrderConfirmation(
          orderResponse.dataValues.email,
          productsData,
          {
            email: orderResponse.dataValues.email,
            username: orderResponse.dataValues.username,
          }
        );
        await orderUseCase.updateProducts(productOrdersVm);
        res.status(201).json({
          data: orderResponse.toJSON<IOrder>(),
          message: "Order created Successfully!",
          validationErrors: [],
          success: true,
        });
      } catch (error: any) {
        res.status(400).json({
          data: null,
          message: error.message,
          validationErrors: [error],
          success: false,
        });
      }
    }
  }

  async getAll(req: Request, res: Response<IOrderResponse>): Promise<void> {
    try {
      const orders = await orderUseCase.getAll();
      const ordersDTO = orderMapper.toDTOs(orders);

      res.json({
        data: ordersDTO,
        message: "Success",
        validationErrors: [],
        success: true,
      });
    } catch (error: any) {
      res.status(400).json({
        data: null,
        message: error.message,
        validationErrors: [error],
        success: false,
      });
    }
  }

  async getOrderById(
    req: Request,
    res: Response<IOrderResponse>
  ): Promise<void> {
    try {
      const id = req.params.id;

      const order = await orderUseCase.getOrderById(id);

      if (!order) {
        throw new NotFoundException("Order", id);
      }
      const orderDTO = orderMapper.toDTO(order);
      res.json({
        data: orderDTO,
        message: "Success",
        validationErrors: [],
        success: true,
      });
    } catch (error: any) {
      res.status(400).json({
        data: null,
        message: error.message,
        validationErrors: [error],
        success: false,
      });
    }
  }

  async updateOrder(
    req: Request,
    res: Response<IOrderResponse>
  ): Promise<void> {
    const dto = new OrderRequestDto(req.body);
    const validationErrors = await validate(dto);

    if (validationErrors.length > 0) {
      res.status(400).json({
        validationErrors: displayValidationErrors(validationErrors) as any,
        success: false,
        data: null,
        message: "Attention!",
      });
    } else {
      try {
        const id = req.params.id;
        const obj: IOrder = {
          ...emptyOrder,
          ...req.body,
          ...dto,
          id: id,
        };

        const order = await orderUseCase.getOrderById(id);

        if (!order) {
          throw new NotFoundException("Order", id);
        }

        const updatedOrder = await orderUseCase.updateOrder(obj);
        const orderDto = orderMapper.toDTO(updatedOrder);

        res.json({
          data: orderDto,
          message: "Order Updated Successfully!",
          validationErrors: [],
          success: true,
        });
      } catch (error: any) {
        res.status(400).json({
          data: null,
          message: error.message,
          validationErrors: [error],
          success: false,
        });
      }
    }
  }

  async deleteOrder(
    req: Request,
    res: Response<IOrderResponse>
  ): Promise<void> {
    try {
      const id = req.params.id;

      const order = await orderUseCase.getOrderById(id);

      if (!order) {
        throw new NotFoundException("Order", id);
      }

      await orderUseCase.deleteOrder(id);

      res.status(204).json({
        message: `Operation successfully completed!`,
        validationErrors: [],
        success: true,
        data: null,
      });
    } catch (error: any) {
      res.status(400).json({
        message: error.message,
        data: null,
        validationErrors: [error],
        success: false,
      });
    }
  }

  async getOrderNo(req: Request, res: Response<IProductResponse>) {
    try {
      const orderId = req.params.orderId;

      const order = await orderUseCase.getOrderByOrderNo(orderId);
      if (!order) {
        throw new NotFoundException("Order", orderId);
      }
      const products = await order.$get("products");
      const productsDTO = productMapper.toDTOs(products);
      res.status(200).json({
        message: `Operation successfully completed!`,
        validationErrors: [],
        success: true,
        data: productsDTO,
      });
    } catch (error: any) {
      res.status(400).json({
        message: error.message,
        data: null,
        validationErrors: [error],
        success: false,
      });
    }
  }
}
