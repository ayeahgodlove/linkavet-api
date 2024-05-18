"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/infrastructure/routes/userDoc-routes.ts
const express_1 = require("express");
const user_doc_controller_1 = require("../controllers/user-doc.controller");
const is_authenticated_middleware_1 = require("../../shared/middlewares/is-authenticated.middleware");
const userDocController = new user_doc_controller_1.UserDocsController();
const userDocRouter = (0, express_1.Router)();
userDocRouter.get("", is_authenticated_middleware_1.isAuthenticatedMiddleware, userDocController.getAll);
userDocRouter.get("/:id", is_authenticated_middleware_1.isAuthenticatedMiddleware, userDocController.getUserDocById);
userDocRouter.post("", is_authenticated_middleware_1.isAuthenticatedMiddleware, userDocController.createUserDoc);
userDocRouter.put("/:id", is_authenticated_middleware_1.isAuthenticatedMiddleware, userDocController.updateUserDoc);
userDocRouter.delete("/:id", is_authenticated_middleware_1.isAuthenticatedMiddleware, userDocController.deleteUserDoc);
exports.default = userDocRouter;
