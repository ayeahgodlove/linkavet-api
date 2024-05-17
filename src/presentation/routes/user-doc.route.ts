// src/infrastructure/routes/userDoc-routes.ts
import { Router } from "express";
import { UserDocsController } from "../controllers/user-doc.controller";
import { isAuthenticatedMiddleware } from "../../shared/middlewares/is-authenticated.middleware";

const userDocController = new UserDocsController();

const userDocRouter = Router();

userDocRouter.get("", isAuthenticatedMiddleware, userDocController.getAll);
userDocRouter.get(
  "/:id",
  isAuthenticatedMiddleware,
  userDocController.getUserDocById
);
userDocRouter.post(
  "",
  isAuthenticatedMiddleware,
  userDocController.createUserDoc
);
userDocRouter.put(
  "/:id",
  isAuthenticatedMiddleware,
  userDocController.updateUserDoc
);
userDocRouter.delete(
  "/:id",
  isAuthenticatedMiddleware,
  userDocController.deleteUserDoc
);

export default userDocRouter;
