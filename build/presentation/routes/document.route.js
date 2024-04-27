"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/infrastructure/routes/document-routes.ts
const express_1 = require("express");
const document_controller_1 = require("../controllers/document.controller");
const is_authenticated_middleware_1 = require("../../shared/middlewares/is-authenticated.middleware");
const documentController = new document_controller_1.DocumentsController();
const documentRouter = (0, express_1.Router)();
documentRouter.get("", documentController.getAll);
documentRouter.get("/:id", documentController.getDocumentById);
documentRouter.post("", is_authenticated_middleware_1.isAuthenticatedMiddleware, documentController.createDocument);
documentRouter.put("/:id", is_authenticated_middleware_1.isAuthenticatedMiddleware, documentController.updateDocument);
documentRouter.delete("/:id", is_authenticated_middleware_1.isAuthenticatedMiddleware, documentController.deleteDocument);
exports.default = documentRouter;
