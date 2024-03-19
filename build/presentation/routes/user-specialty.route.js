"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/infrastructure/routes/userSpecialty-routes.ts
const express_1 = require("express");
const user_specialty_controller_1 = require("../controllers/user-specialty.controller");
const is_authenticated_middleware_1 = require("../../shared/middlewares/is-authenticated.middleware");
const userSpecialtyController = new user_specialty_controller_1.UserSpecialtyController();
const userSpecialtyRouter = (0, express_1.Router)();
userSpecialtyRouter.get("", userSpecialtyController.getAll);
userSpecialtyRouter.get("/:id", userSpecialtyController.getUserSpecialtyById);
userSpecialtyRouter.post("", is_authenticated_middleware_1.isAuthenticatedMiddleware, userSpecialtyController.createUserSpecialty);
userSpecialtyRouter.put("/:id", is_authenticated_middleware_1.isAuthenticatedMiddleware, userSpecialtyController.updateUserSpecialty);
userSpecialtyRouter.delete("/:id", is_authenticated_middleware_1.isAuthenticatedMiddleware, userSpecialtyController.deleteUserSpecialty);
exports.default = userSpecialtyRouter;
