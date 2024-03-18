// src/infrastructure/routes/userSpecialty-routes.ts
import { Router } from "express";
import { UserSpecialtyController } from "../controllers/user-specialty.controller";
import { isAuthenticatedMiddleware } from "../../shared/middlewares/is-authenticated.middleware";

const userSpecialtyController = new UserSpecialtyController();

const userSpecialtyRouter = Router();

userSpecialtyRouter.get("", userSpecialtyController.getAll);
userSpecialtyRouter.get("/:id", userSpecialtyController.getUserSpecialtyById);
userSpecialtyRouter.post("",isAuthenticatedMiddleware, userSpecialtyController.createUserSpecialty);
userSpecialtyRouter.put("/:id",isAuthenticatedMiddleware, userSpecialtyController.updateUserSpecialty);
userSpecialtyRouter.delete("/:id",isAuthenticatedMiddleware, userSpecialtyController.deleteUserSpecialty);

export default userSpecialtyRouter; 
