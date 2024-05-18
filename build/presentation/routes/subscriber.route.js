"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/infrastructure/routes/subscriber-routes.ts
const express_1 = require("express");
const subscriber_controller_1 = require("../controllers/subscriber.controller");
const is_authenticated_middleware_1 = require("../../shared/middlewares/is-authenticated.middleware");
const subscriberController = new subscriber_controller_1.SubscribersController();
const subscriberRouter = (0, express_1.Router)();
subscriberRouter.get("", is_authenticated_middleware_1.isAuthenticatedMiddleware, subscriberController.getAll);
subscriberRouter.get("/:id", is_authenticated_middleware_1.isAuthenticatedMiddleware, subscriberController.getSubscriberById);
subscriberRouter.post("", subscriberController.createSubscriber);
subscriberRouter.put("/:id", is_authenticated_middleware_1.isAuthenticatedMiddleware, subscriberController.updateSubscriber);
subscriberRouter.delete("/:id", is_authenticated_middleware_1.isAuthenticatedMiddleware, subscriberController.deleteSubscriber);
exports.default = subscriberRouter;
