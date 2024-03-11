// src/infrastructure/routes/order-routes.ts
import { Router } from "express";
import { OrdersController } from "../controllers/order.controller";
import { isAuthenticatedMiddleware } from "../../shared/middlewares/is-authenticated.middleware";

const orderController = new OrdersController();

const orderRouter = Router();

orderRouter.get("", orderController.getAll);
orderRouter.get(
  "/:id",
  isAuthenticatedMiddleware,
  orderController.getOrderById
);
orderRouter.post("", orderController.createOrder);
orderRouter.put("/:id", isAuthenticatedMiddleware, orderController.updateOrder);
orderRouter.delete(
  "/:id",
  isAuthenticatedMiddleware,
  orderController.deleteOrder
);
orderRouter.get("/products/:orderId", orderController.getOrderNo);

export default orderRouter;
