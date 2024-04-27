"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/infrastructure/routes/store-routes.ts
const express_1 = require("express");
const store_controller_1 = require("../controllers/store.controller");
const is_authenticated_middleware_1 = require("../../shared/middlewares/is-authenticated.middleware");
const storeController = new store_controller_1.StoresController();
const storeRouter = (0, express_1.Router)();
storeRouter.get("", storeController.getAll);
storeRouter.get("/:id", storeController.getStoreById);
storeRouter.post("", is_authenticated_middleware_1.isAuthenticatedMiddleware, storeController.createStore);
storeRouter.put("/:id", is_authenticated_middleware_1.isAuthenticatedMiddleware, storeController.updateStore);
storeRouter.delete("/:id", is_authenticated_middleware_1.isAuthenticatedMiddleware, storeController.deleteStore);
exports.default = storeRouter;
