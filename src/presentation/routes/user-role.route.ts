// src/infrastructure/routes/userRole-routes.ts
import { Router } from "express";
import { UserRolesController } from "../controllers/user-role.controller";
import { isAuthenticatedMiddleware } from "../../shared/middlewares/is-authenticated.middleware";

const userRoleController = new UserRolesController();

const userRoleRouter = Router();

userRoleRouter.get("", userRoleController.getAll);
userRoleRouter.get("/:id", userRoleController.getUserRoleById);
userRoleRouter.post("",isAuthenticatedMiddleware, userRoleController.createUserRole);
userRoleRouter.put("/:id",isAuthenticatedMiddleware, userRoleController.updateUserRole);
userRoleRouter.delete("/:id",isAuthenticatedMiddleware, userRoleController.deleteUserRole);

export default userRoleRouter; 
