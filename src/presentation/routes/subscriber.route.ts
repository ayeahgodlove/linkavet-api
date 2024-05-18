// src/infrastructure/routes/subscriber-routes.ts
import { Router } from "express";
import { SubscribersController } from "../controllers/subscriber.controller";
import { isAuthenticatedMiddleware } from "../../shared/middlewares/is-authenticated.middleware";

const subscriberController = new SubscribersController();

const subscriberRouter = Router();

subscriberRouter.get(
  "",
  isAuthenticatedMiddleware,
  subscriberController.getAll
);
subscriberRouter.get(
  "/:id",
  isAuthenticatedMiddleware,
  subscriberController.getSubscriberById
);
subscriberRouter.post("", subscriberController.createSubscriber);
subscriberRouter.put(
  "/:id",
  isAuthenticatedMiddleware,
  subscriberController.updateSubscriber
);
subscriberRouter.delete(
  "/:id",
  isAuthenticatedMiddleware,
  subscriberController.deleteSubscriber
);

export default subscriberRouter;
