// src/infrastructure/routes/faq-routes.ts
import { Router } from "express";
import { FaqsController } from "../controllers/faq.controller";
import { isAuthenticatedMiddleware } from "../../shared/middlewares/is-authenticated.middleware";

const faqController = new FaqsController();

const faqRouter = Router();

faqRouter.get("", faqController.getAll);
faqRouter.get("/:id", isAuthenticatedMiddleware, faqController.getFaqById);
faqRouter.post("", isAuthenticatedMiddleware, faqController.createFaq);
faqRouter.put("/:id", isAuthenticatedMiddleware, faqController.updateFaq);
faqRouter.delete("/:id", isAuthenticatedMiddleware, faqController.deleteFaq);

export default faqRouter;
