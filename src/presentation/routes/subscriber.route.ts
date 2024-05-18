// src/infrastructure/routes/subscriber-routes.ts
import { Router } from "express";
import { SubscribersController } from "../controllers/subscriber.controller";
import { isAuthenticatedMiddleware } from "../../shared/middlewares/is-authenticated.middleware";

const subscriberController = new SubscribersController();

const subscriberRouter = Router();

subscriberRouter.get("", subscriberController.getAll);
subscriberRouter.get("/:id", subscriberController.getSubscriberById);
subscriberRouter.post("", isAuthenticatedMiddleware, subscriberController.createSubscriber);
subscriberRouter.put("/:id", isAuthenticatedMiddleware, subscriberController.updateSubscriber);
subscriberRouter.delete("/:id", isAuthenticatedMiddleware, subscriberController.deleteSubscriber);

export default subscriberRouter;
