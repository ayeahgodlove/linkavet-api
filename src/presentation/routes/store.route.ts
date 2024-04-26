// src/infrastructure/routes/store-routes.ts
import { Router } from "express";
import { StoresController } from "../controllers/store.controller";
import { isAuthenticatedMiddleware } from "../../shared/middlewares/is-authenticated.middleware";
import multer from "multer";
import { fileFilter } from "../../shared/helper/multer.config";

const storeController = new StoresController();

const storeRouter = Router();

storeRouter.get("", storeController.getAll);
storeRouter.get("/:id", storeController.getStoreById);
storeRouter.post("", isAuthenticatedMiddleware, storeController.createStore);
storeRouter.put("/:id", isAuthenticatedMiddleware, storeController.updateStore);
storeRouter.delete(
  "/:id",
  isAuthenticatedMiddleware,
  storeController.deleteStore
);

export default storeRouter;
