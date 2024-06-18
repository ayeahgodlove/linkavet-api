// src/infrastructure/routes/contact-routes.ts
import { Router } from "express";
import { ContactsController } from "../controllers/contact.controller";
import { isAuthenticatedMiddleware } from "../../shared/middlewares/is-authenticated.middleware";

const contactController = new ContactsController();

const contactRouter = Router();

contactRouter.get("", contactController.getAll);
contactRouter.get("/:id", contactController.getContactById);
contactRouter.post("", isAuthenticatedMiddleware, contactController.createContact);
contactRouter.put("/:id", isAuthenticatedMiddleware, contactController.updateContact);
contactRouter.delete("/:id", isAuthenticatedMiddleware, contactController.deleteContact);

export default contactRouter;
