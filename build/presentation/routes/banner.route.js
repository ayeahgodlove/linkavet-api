"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/infrastructure/routes/banner-routes.ts
const express_1 = require("express");
const banner_controller_1 = require("../controllers/banner.controller");
const is_authenticated_middleware_1 = require("../../shared/middlewares/is-authenticated.middleware");
const bannerController = new banner_controller_1.BannersController();
const bannerRouter = (0, express_1.Router)();
bannerRouter.get("", bannerController.getAll);
bannerRouter.get("/:id", is_authenticated_middleware_1.isAuthenticatedMiddleware, bannerController.getBannerById);
bannerRouter.post("", is_authenticated_middleware_1.isAuthenticatedMiddleware, bannerController.createBanner);
bannerRouter.put("/:id", is_authenticated_middleware_1.isAuthenticatedMiddleware, bannerController.updateBanner);
bannerRouter.delete("/:id", is_authenticated_middleware_1.isAuthenticatedMiddleware, bannerController.deleteBanner);
exports.default = bannerRouter;
