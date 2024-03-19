"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersController = void 0;
const order_1 = require("../../domain/models/order");
const order_usecase_1 = require("../../domain/usecases/order.usecase");
const order_repository_1 = require("../../data/repositories/impl/order.repository");
const order_request_dto_1 = require("../dtos/order-request.dto");
const class_validator_1 = require("class-validator");
const displayValidationErrors_1 = require("../../utils/displayValidationErrors");
const not_found_exception_1 = require("../../shared/exceptions/not-found.exception");
const mapper_1 = require("../mappers/mapper");
const product_order_repository_1 = require("../../data/repositories/impl/product-order.repository");
const product_order_usecase_1 = require("../../domain/usecases/product-order.usecase");
const product_order_1 = require("../../domain/models/product-order");
const email_1 = require("../../utils/email");
const orderRepository = new order_repository_1.OrderRepository();
const orderUseCase = new order_usecase_1.OrderUseCase(orderRepository);
const orderMapper = new mapper_1.OrderMapper();
const productMapper = new mapper_1.ProductMapper();
const productOrderRepository = new product_order_repository_1.ProductOrderRepository();
const productOrderUseCase = new product_order_usecase_1.ProductOrderUseCase(productOrderRepository);
class OrdersController {
    async createOrder(req, res) {
        const dto = new order_request_dto_1.OrderRequestDto(req.body);
        const validationErrors = await (0, class_validator_1.validate)(dto);
        if (validationErrors.length > 0) {
            res.status(400).json({
                validationErrors: (0, displayValidationErrors_1.displayValidationErrors)(validationErrors),
                success: false,
                data: null,
                message: "Attention!",
            });
        }
        else {
            try {
                const orderResponse = await orderUseCase.createOrder(dto.toData());
                const products = req.body.products;
                const productOrdersVm = products.map((p) => {
                    return {
                        ...product_order_1.emptyProductOrder,
                        ...p,
                        orderId: orderResponse.dataValues.id,
                    };
                });
                await productOrderUseCase.createManyOrders(productOrdersVm);
                const productsData = await orderResponse.$get("products");
                await (0, email_1.sendOrderConfirmation)(orderResponse.dataValues.email, productsData, {
                    email: orderResponse.dataValues.email,
                    username: orderResponse.dataValues.username,
                });
                await orderUseCase.updateProducts(productOrdersVm);
                res.status(201).json({
                    data: orderResponse.toJSON(),
                    message: "Order created Successfully!",
                    validationErrors: [],
                    success: true,
                });
            }
            catch (error) {
                res.status(400).json({
                    data: null,
                    message: error.message,
                    validationErrors: [error],
                    success: false,
                });
            }
        }
    }
    async getAll(req, res) {
        try {
            const orders = await orderUseCase.getAll();
            const ordersDTO = orderMapper.toDTOs(orders);
            res.json({
                data: ordersDTO,
                message: "Success",
                validationErrors: [],
                success: true,
            });
        }
        catch (error) {
            res.status(400).json({
                data: null,
                message: error.message,
                validationErrors: [error],
                success: false,
            });
        }
    }
    async getOrderById(req, res) {
        try {
            const id = req.params.id;
            const order = await orderUseCase.getOrderById(id);
            if (!order) {
                throw new not_found_exception_1.NotFoundException("Order", id);
            }
            const orderDTO = orderMapper.toDTO(order);
            res.json({
                data: orderDTO,
                message: "Success",
                validationErrors: [],
                success: true,
            });
        }
        catch (error) {
            res.status(400).json({
                data: null,
                message: error.message,
                validationErrors: [error],
                success: false,
            });
        }
    }
    async updateOrder(req, res) {
        const dto = new order_request_dto_1.OrderRequestDto(req.body);
        const validationErrors = await (0, class_validator_1.validate)(dto);
        if (validationErrors.length > 0) {
            res.status(400).json({
                validationErrors: (0, displayValidationErrors_1.displayValidationErrors)(validationErrors),
                success: false,
                data: null,
                message: "Attention!",
            });
        }
        else {
            try {
                const id = req.params.id;
                const obj = {
                    ...order_1.emptyOrder,
                    ...req.body,
                    ...dto,
                    id: id,
                };
                const order = await orderUseCase.getOrderById(id);
                if (!order) {
                    throw new not_found_exception_1.NotFoundException("Order", id);
                }
                const updatedOrder = await orderUseCase.updateOrder(obj);
                const orderDto = orderMapper.toDTO(updatedOrder);
                res.json({
                    data: orderDto,
                    message: "Order Updated Successfully!",
                    validationErrors: [],
                    success: true,
                });
            }
            catch (error) {
                res.status(400).json({
                    data: null,
                    message: error.message,
                    validationErrors: [error],
                    success: false,
                });
            }
        }
    }
    async deleteOrder(req, res) {
        try {
            const id = req.params.id;
            const order = await orderUseCase.getOrderById(id);
            if (!order) {
                throw new not_found_exception_1.NotFoundException("Order", id);
            }
            await orderUseCase.deleteOrder(id);
            res.status(204).json({
                message: `Operation successfully completed!`,
                validationErrors: [],
                success: true,
                data: null,
            });
        }
        catch (error) {
            res.status(400).json({
                message: error.message,
                data: null,
                validationErrors: [error],
                success: false,
            });
        }
    }
    async getOrderNo(req, res) {
        try {
            const orderId = req.params.orderId;
            const order = await orderUseCase.getOrderByOrderNo(orderId);
            if (!order) {
                throw new not_found_exception_1.NotFoundException("Order", orderId);
            }
            const products = await order.$get("products");
            const productsDTO = productMapper.toDTOs(products);
            res.status(200).json({
                message: `Operation successfully completed!`,
                validationErrors: [],
                success: true,
                data: productsDTO,
            });
        }
        catch (error) {
            res.status(400).json({
                message: error.message,
                data: null,
                validationErrors: [error],
                success: false,
            });
        }
    }
}
exports.OrdersController = OrdersController;
