"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductOrderRepository = void 0;
const product_order_1 = require("../../entities/product-order");
const not_found_exception_1 = require("../../../shared/exceptions/not-found.exception");
const user_1 = require("../../entities/user");
class ProductOrderRepository {
    /**
     *
     */
    constructor() { }
    async createManyOrders(productOrders) {
        try {
            const createdOrders = await product_order_1.ProductOrder.bulkCreate(productOrders);
            return createdOrders;
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Receives a ProductOrder as parameter
     * @productOrder
     * returns void
     */
    async create(productOrder) {
        try {
            return await product_order_1.ProductOrder.create({ ...productOrder });
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Receives a String as parameter
     * @id
     * returns ProductOrder
     */
    async findById(id) {
        try {
            const productOrderItem = await product_order_1.ProductOrder.findByPk(id);
            if (!productOrderItem) {
                throw new not_found_exception_1.NotFoundException("ProductOrder", id);
            }
            return productOrderItem;
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Receives a String as parameter
     * @name
     * returns ProductOrder
     */
    async findByName(name) {
        try {
            const productOrderItem = await product_order_1.ProductOrder.findOne({
                include: [user_1.User],
            });
            return productOrderItem;
        }
        catch (error) {
            throw error;
        }
    }
    /*
     * Returns an array of ProductOrder
     */
    async getAll() {
        try {
            const productOrders = await product_order_1.ProductOrder.findAll();
            return productOrders;
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Receives a ProductOrder as parameter
     * @productOrder
     * returns void
     */
    async update(productOrder) {
        const { orderId } = productOrder;
        try {
            const productOrderItem = await product_order_1.ProductOrder.findByPk(orderId);
            console.log(productOrder);
            if (!productOrderItem) {
                throw new not_found_exception_1.NotFoundException("ProductOrder", orderId.toString());
            }
            return await productOrderItem.update({ ...productOrder });
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Receives a string as parameter
     * @id
     * returns void
     */
    async delete(id) {
        try {
            const productOrderItem = await product_order_1.ProductOrder.findByPk(id);
            if (!productOrderItem) {
                throw new not_found_exception_1.NotFoundException("ProductOrder", id);
            }
            await productOrderItem.destroy({
                force: true,
            });
        }
        catch (error) {
            throw error;
        }
    }
}
exports.ProductOrderRepository = ProductOrderRepository;
