// src/infrastructure/routes/event-routes.ts
import { Router } from "express";
import { EventsController } from "../controllers/event.controller";
import { isAuthenticatedMiddleware } from "../../shared/middlewares/is-authenticated.middleware";

const eventController = new EventsController();

const eventRouter = Router();

eventRouter.get("", eventController.getAll);
eventRouter.get("/:id", eventController.getEventById);
eventRouter.post("",isAuthenticatedMiddleware, eventController.createEvent);
eventRouter.put("/:id",isAuthenticatedMiddleware, eventController.updateEvent);
eventRouter.delete("/:id",isAuthenticatedMiddleware, eventController.deleteEvent);

export default eventRouter;
