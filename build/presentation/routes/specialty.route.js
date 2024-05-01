"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/infrastructure/routes/specialty-routes.ts
const express_1 = require("express");
const specialty_controller_1 = require("../controllers/specialty.controller");
const is_authenticated_middleware_1 = require("../../shared/middlewares/is-authenticated.middleware");
const specialtyController = new specialty_controller_1.SpecialtyController();
const specialtyRouter = (0, express_1.Router)();
specialtyRouter.get("", specialtyController.getAll);
specialtyRouter.get("/:id", specialtyController.getSpecialtyById);
specialtyRouter.post("", is_authenticated_middleware_1.isAuthenticatedMiddleware, specialtyController.createSpecialty);
specialtyRouter.put("/:id", is_authenticated_middleware_1.isAuthenticatedMiddleware, specialtyController.updateSpecialty);
specialtyRouter.delete("/:id", is_authenticated_middleware_1.isAuthenticatedMiddleware, specialtyController.deleteSpecialty);
exports.default = specialtyRouter;
