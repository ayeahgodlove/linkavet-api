"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/infrastructure/routes/service-routes.ts
const express_1 = require("express");
const service_controller_1 = require("../controllers/service.controller");
const is_authenticated_middleware_1 = require("../../shared/middlewares/is-authenticated.middleware");
const serviceController = new service_controller_1.ServicesController();
const serviceRouter = (0, express_1.Router)();
serviceRouter.get("", serviceController.getAll);
serviceRouter.get("/:id", serviceController.getServiceById);
serviceRouter.get("/slugs/:slug", serviceController.getServiceBySlug);
serviceRouter.post("", is_authenticated_middleware_1.isAuthenticatedMiddleware, serviceController.createService);
serviceRouter.put("/:id", is_authenticated_middleware_1.isAuthenticatedMiddleware, serviceController.updateService);
serviceRouter.delete("/:id", is_authenticated_middleware_1.isAuthenticatedMiddleware, serviceController.deleteService);
exports.default = serviceRouter;
