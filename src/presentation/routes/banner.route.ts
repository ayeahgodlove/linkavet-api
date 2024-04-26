// src/infrastructure/routes/banner-routes.ts
import { Router } from "express";
import { BannersController } from "../controllers/banner.controller";
import { isAuthenticatedMiddleware } from "../../shared/middlewares/is-authenticated.middleware";

const bannerController = new BannersController();

const bannerRouter = Router();

bannerRouter.get("", bannerController.getAll);
bannerRouter.get(
  "/:id",
  isAuthenticatedMiddleware,
  bannerController.getBannerById
);
bannerRouter.post("", isAuthenticatedMiddleware, bannerController.createBanner);
bannerRouter.put(
  "/:id",
  isAuthenticatedMiddleware,
  bannerController.updateBanner
);
bannerRouter.delete(
  "/:id",
  isAuthenticatedMiddleware,
  bannerController.deleteBanner
);

export default bannerRouter;
