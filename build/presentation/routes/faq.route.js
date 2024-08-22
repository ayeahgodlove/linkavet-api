"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/infrastructure/routes/faq-routes.ts
const express_1 = require("express");
const faq_controller_1 = require("../controllers/faq.controller");
const is_authenticated_middleware_1 = require("../../shared/middlewares/is-authenticated.middleware");
const faqController = new faq_controller_1.FaqsController();
const faqRouter = (0, express_1.Router)();
faqRouter.get("", faqController.getAll);
faqRouter.get("/:id", is_authenticated_middleware_1.isAuthenticatedMiddleware, faqController.getFaqById);
faqRouter.post("", is_authenticated_middleware_1.isAuthenticatedMiddleware, faqController.createFaq);
faqRouter.put("/:id", is_authenticated_middleware_1.isAuthenticatedMiddleware, faqController.updateFaq);
faqRouter.delete("/:id", is_authenticated_middleware_1.isAuthenticatedMiddleware, faqController.deleteFaq);
exports.default = faqRouter;
