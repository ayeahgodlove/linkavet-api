"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/infrastructure/routes/event-routes.ts
const express_1 = require("express");
const event_controller_1 = require("../controllers/event.controller");
const is_authenticated_middleware_1 = require("../../shared/middlewares/is-authenticated.middleware");
const eventController = new event_controller_1.EventsController();
const eventRouter = (0, express_1.Router)();
eventRouter.get("", eventController.getAll);
eventRouter.get("/:id", eventController.getEventById);
eventRouter.post("", is_authenticated_middleware_1.isAuthenticatedMiddleware, eventController.createEvent);
eventRouter.put("/:id", is_authenticated_middleware_1.isAuthenticatedMiddleware, eventController.updateEvent);
eventRouter.delete("/:id", is_authenticated_middleware_1.isAuthenticatedMiddleware, eventController.deleteEvent);
exports.default = eventRouter;
