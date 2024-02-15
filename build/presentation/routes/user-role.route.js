"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/infrastructure/routes/userRole-routes.ts
const express_1 = require("express");
const user_role_controller_1 = require("../controllers/user-role.controller");
const is_authenticated_middleware_1 = require("../../shared/middlewares/is-authenticated.middleware");
const userRoleController = new user_role_controller_1.UserRolesController();
const userRoleRouter = (0, express_1.Router)();
userRoleRouter.get("", userRoleController.getAll);
userRoleRouter.get("/:id", userRoleController.getUserRoleById);
userRoleRouter.post("", is_authenticated_middleware_1.isAuthenticatedMiddleware, userRoleController.createUserRole);
userRoleRouter.put("/:id", is_authenticated_middleware_1.isAuthenticatedMiddleware, userRoleController.updateUserRole);
userRoleRouter.delete("/:id", is_authenticated_middleware_1.isAuthenticatedMiddleware, userRoleController.deleteUserRole);
exports.default = userRoleRouter;
