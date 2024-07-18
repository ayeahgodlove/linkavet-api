// src/infrastructure/routes/cart-routes.ts
import { Router } from "express";
import { CartController } from "../controllers/cart.controller";
import { isAuthenticatedMiddleware } from "../../shared/middlewares/is-authenticated.middleware";

const cartController = new CartController();

const cartRouter = Router();

cartRouter.get(
  "/items",
  isAuthenticatedMiddleware,
  cartController.getCartItems
);
// cartRouter.get("/:id", cartController.getCartById);
cartRouter.post("/add", isAuthenticatedMiddleware, cartController.addToCart);
cartRouter.delete(
  "/remove/:itemId",
  isAuthenticatedMiddleware,
  cartController.removeCartItem
);

export default cartRouter;
