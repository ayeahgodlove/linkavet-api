"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/infrastructure/routes/cart-routes.ts
const express_1 = require("express");
const cart_controller_1 = require("../controllers/cart.controller");
const is_authenticated_middleware_1 = require("../../shared/middlewares/is-authenticated.middleware");
const product_1 = require("../../data/entities/product");
const cart_item_1 = require("../../data/entities/cart-item");
const cartController = new cart_controller_1.CartController();
const cartRouter = (io) => {
    const cartRouter = (0, express_1.Router)();
    cartRouter.get("/items", is_authenticated_middleware_1.isAuthenticatedMiddleware, async (req, res) => {
        const user = req.user;
        const userId = user.id;
        try {
            const cartItems = await cartController.getCartItems(userId);
            res.json(cartItems);
            io.emit("cart-items", cartItems);
        }
        catch (error) {
            res.status(500).json({
                data: null,
                message: error.message,
                validationErrors: [],
                success: false,
            });
        }
    });
    cartRouter.post("/add", is_authenticated_middleware_1.isAuthenticatedMiddleware, async (req, res) => {
        const user = req.user;
        const userId = user.id;
        const { productId, quantity } = req.body;
        let product = await product_1.Product.findByPk(productId);
        if (!product) {
            res.status(404).json({
                validationErrors: [],
                success: false,
                data: null,
                message: "Product not found!",
            });
        }
        else {
            try {
                const cartItem = await cartController.addToCart(userId, productId, quantity, product);
                res.status(201).json({
                    data: cartItem,
                    message: "Item Added to Cart Successfully!",
                    validationErrors: [],
                    success: true,
                });
                io.emit("cart-updated", cartItem);
            }
            catch (error) {
                res.status(400).json({
                    data: null,
                    message: error.message,
                    validationErrors: [],
                    success: false,
                });
            }
        }
    });
    cartRouter.delete("/remove/:itemId", is_authenticated_middleware_1.isAuthenticatedMiddleware, async (req, res) => {
        const user = req.user;
        const userId = user.id;
        const itemId = req.params.itemId;
        try {
            const cartItem = await cart_item_1.CartItem.findByPk(itemId);
            if (!cartItem || cartItem.dataValues.userId !== userId) {
                res.status(404).json({
                    message: "Item not found in cart",
                    success: false,
                    data: null,
                    validationErrors: [],
                });
            }
            else {
                await cartItem.destroy({ force: true });
                res.json({
                    message: "Item removed from cart",
                    success: true,
                    data: null,
                    validationErrors: [],
                });
                io.emit("cart-updated", itemId);
            }
        }
        catch (error) {
            res.status(500).json({
                message: "Internal server error",
                success: false,
                data: null,
                validationErrors: [],
            });
        }
    });
    cartRouter.delete("/clear", is_authenticated_middleware_1.isAuthenticatedMiddleware, async (req, res) => {
        const user = req.user;
        const userId = user.id;
        try {
            await cart_item_1.CartItem.destroy({
                where: { userId },
            });
            res.json({
                message: "Cart cleared",
                success: true,
                data: null,
                validationErrors: [],
            });
            io.emit("cart-updated");
        }
        catch (error) {
            res.status(500).json({
                message: "Internal server error",
                success: false,
                data: null,
                validationErrors: [],
            });
        }
    });
    return cartRouter;
};
exports.default = cartRouter;
