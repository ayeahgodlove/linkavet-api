// src/infrastructure/routes/cart-routes.ts
import { Router } from "express";
import { CartController } from "../controllers/cart.controller";
import { isAuthenticatedMiddleware } from "../../shared/middlewares/is-authenticated.middleware";
import { Socket } from "socket.io";
import { Request, Response } from "express";
import { User } from "../../data/entities/user";
import { Product } from "../../data/entities/product";
import { CartItem } from "../../data/entities/cart-item";

const cartController = new CartController();

const cartRouter = (io: any) => {
  const cartRouter = Router();
  cartRouter.get(
    "/items",
    isAuthenticatedMiddleware,
    async (req: Request, res: Response<any>): Promise<void> => {
      const user = req. user as User;
      const userId = user.id;

      try {
        const cartItems = await cartController.getCartItems(userId);

        res.json(cartItems);
        io.emit("cart-items", cartItems);
      } catch (error: any) {
        res.status(500).json({
          data: null,
          message: error.message,
          validationErrors: [],
          success: false,
        });
      }
    }
  );
  cartRouter.post(
    "/add",
    isAuthenticatedMiddleware,
    async (req: Request, res: Response<any>): Promise<void> => {
      const user = req.user as User;
      const userId = user.id;
      const { productId, quantity } = req.body;

      let product = await Product.findByPk(productId);

      if (!product) {
        res.status(404).json({
          validationErrors: [],
          success: false,
          data: null,
          message: "Product not found!",
        });
      } else {
        try {
          const cartItem = await cartController.addToCart(
            userId,
            productId,
            quantity,
            product
          );

          res.status(201).json({
            data: cartItem,
            message: "Item Added to Cart Successfully!",
            validationErrors: [],
            success: true,
          });
          io.emit("cart-updated", cartItem);
        } catch (error: any) {
          res.status(400).json({
            data: null,
            message: error.message,
            validationErrors: [],
            success: false,
          });
        }
      }
    }
  );
  cartRouter.delete(
    "/remove/:itemId",
    isAuthenticatedMiddleware,
    async (req: Request, res: Response<any>): Promise<void> => {
      const user = req.user as User;
      const userId = user.id;
      const itemId = req.params.itemId;

      try {
        const cartItem = await CartItem.findByPk(itemId);
        if (!cartItem || cartItem.userId !== userId) {
          res.status(404).json({
            message: "Item not found in cart",
            success: false,
            data: null,
            validationErrors: [],
          });
        } else {
          await cartItem.destroy();
          res.json({
            message: "Item removed from cart",
            success: true,
            data: null,
            validationErrors: [],
          });
          io.emit("cart-updated", itemId);
        }
      } catch (error) {
        res.status(500).json({
          message: "Internal server error",
          success: false,
          data: null,
          validationErrors: [],
        });
      }
    }
  );

  cartRouter.delete(
    "/clear",
    isAuthenticatedMiddleware,
    async (req: Request, res: Response<any>): Promise<void> => {
      const user = req.user as User;
      const userId = user.id;

      try {
        await CartItem.destroy({
          where: { userId },
        });
        res.json({
          message: "Cart cleared",
          success: true,
          data: null,
          validationErrors: [],
        });
        io.emit("cart-updated");
      } catch (error) {
        res.status(500).json({
          message: "Internal server error",
          success: false,
          data: null,
          validationErrors: [],
        });
      }
    }
  );

  return cartRouter;
};
export default cartRouter;
