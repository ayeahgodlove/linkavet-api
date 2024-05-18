// src/infrastructure/routes/mail-routes.ts
import { Router } from "express";
import { MailsController } from "../controllers/mail.controller";
import { isAuthenticatedMiddleware } from "../../shared/middlewares/is-authenticated.middleware";

const mailController = new MailsController();

const mailRouter = Router();

mailRouter.get("", mailController.getAll);
mailRouter.get("/:id", mailController.getMailById);
mailRouter.post("", isAuthenticatedMiddleware, mailController.createMail);
mailRouter.put("/:id", isAuthenticatedMiddleware, mailController.updateMail);
mailRouter.delete("/:id", isAuthenticatedMiddleware, mailController.deleteMail);

export default mailRouter;
