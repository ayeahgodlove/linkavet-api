"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/infrastructure/routes/contact-routes.ts
const express_1 = require("express");
const contact_controller_1 = require("../controllers/contact.controller");
const is_authenticated_middleware_1 = require("../../shared/middlewares/is-authenticated.middleware");
const contactController = new contact_controller_1.ContactsController();
const contactRouter = (0, express_1.Router)();
contactRouter.get("", contactController.getAll);
contactRouter.get("/:id", contactController.getContactById);
contactRouter.post("", is_authenticated_middleware_1.isAuthenticatedMiddleware, contactController.createContact);
contactRouter.put("/:id", is_authenticated_middleware_1.isAuthenticatedMiddleware, contactController.updateContact);
contactRouter.delete("/:id", is_authenticated_middleware_1.isAuthenticatedMiddleware, contactController.deleteContact);
exports.default = contactRouter;
