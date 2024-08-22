"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartController = void 0;
const user_1 = require("../../data/entities/user");
const cart_item_1 = require("../../data/entities/cart-item");
const nanoid_1 = require("nanoid");
const product_1 = require("../../data/entities/product");
const util_1 = require("../../utils/util");
class CartController {
    async addToCart(userId, productId, quantity, product) {
        let cartItem = await cart_item_1.CartItem.findOne({
            where: { userId: userId, productId },
        });
        if (cartItem) {
            // If exists, update quantity
            cartItem.dataValues.quantity += quantity;
            //   calculate discounted price
            const discountedPrice = (0, util_1.calculateDiscountedPrice)(product.dataValues.amount, product.dataValues.discountPercentage);
            const total = (0, util_1.calculateTotal)(discountedPrice, cartItem.quantity);
            cartItem.dataValues.discountPercentage =
                product.dataValues.discountPercentage;
            cartItem.dataValues.discountedPrice = discountedPrice;
            cartItem.dataValues.total = total;
            await cartItem.save();
        }
        else {
            //   calculate discounted price
            const discountedPrice = (0, util_1.calculateDiscountedPrice)(product.dataValues.amount, product.dataValues.discountPercentage);
            const total = (0, util_1.calculateTotal)(discountedPrice, quantity);
            // If not exists, create new cart item
            cartItem = await cart_item_1.CartItem.create({
                id: (0, nanoid_1.nanoid)(10),
                userId: userId,
                productId,
                quantity,
                discountedPrice,
                discountPercentage: product.dataValues.discountPercentage,
                total,
            });
        }
        return cartItem.toJSON();
    }
    async getCartItems(userId) {
        const cartItems = await cart_item_1.CartItem.findAll({
            where: { userId },
            include: [user_1.User, product_1.Product],
        });
        return cartItems;
    }
}
exports.CartController = CartController;
