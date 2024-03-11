"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductOrderUseCase = void 0;
class ProductOrderUseCase {
    productOrderRepository;
    /**
     *
     */
    constructor(productOrderRepository) {
        this.productOrderRepository = productOrderRepository;
    }
    async createManyOrders(productOrders) {
        return this.productOrderRepository.createManyOrders(productOrders);
    }
    async createProductOrder(productOrder) {
        return this.productOrderRepository.create(productOrder);
    }
    async getAll() {
        return this.productOrderRepository.getAll();
    }
    async getProductOrderById(id) {
        return this.productOrderRepository.findById(id);
    }
    async updateProductOrder(productOrder) {
        return this.productOrderRepository.update(productOrder);
    }
    async deleteProductOrder(id) {
        return this.productOrderRepository.delete(id);
    }
}
exports.ProductOrderUseCase = ProductOrderUseCase;
