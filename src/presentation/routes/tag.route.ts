// src/infrastructure/routes/tag-routes.ts
import { Router } from "express";
import { TagsController } from "../controllers/tag.controller";
import { isAuthenticatedMiddleware } from "../../shared/middlewares/is-authenticated.middleware";

const tagController = new TagsController();

const tagRouter = Router();

tagRouter.get("", tagController.getAll);
tagRouter.get("/:id", tagController.getTagById);
tagRouter.post("",isAuthenticatedMiddleware, tagController.createTag);
tagRouter.put("/:id",isAuthenticatedMiddleware, tagController.updateTag);
tagRouter.delete("/:id",isAuthenticatedMiddleware, tagController.deleteTag);

export default tagRouter;
