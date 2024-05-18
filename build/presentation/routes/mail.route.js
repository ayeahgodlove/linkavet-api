"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/infrastructure/routes/mail-routes.ts
const express_1 = require("express");
const mail_controller_1 = require("../controllers/mail.controller");
const is_authenticated_middleware_1 = require("../../shared/middlewares/is-authenticated.middleware");
const mailController = new mail_controller_1.MailsController();
const mailRouter = (0, express_1.Router)();
mailRouter.get("", mailController.getAll);
mailRouter.get("/:id", mailController.getMailById);
mailRouter.post("", is_authenticated_middleware_1.isAuthenticatedMiddleware, mailController.createMail);
mailRouter.put("/:id", is_authenticated_middleware_1.isAuthenticatedMiddleware, mailController.updateMail);
mailRouter.delete("/:id", is_authenticated_middleware_1.isAuthenticatedMiddleware, mailController.deleteMail);
exports.default = mailRouter;
