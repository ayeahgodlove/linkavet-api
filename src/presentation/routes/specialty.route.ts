// src/infrastructure/routes/specialty-routes.ts
import { Router } from "express";
import { SpecialtyController } from "../controllers/specialty.controller";
import { isAuthenticatedMiddleware } from "../../shared/middlewares/is-authenticated.middleware";

const specialtyController = new SpecialtyController();

const specialtyRouter = Router();

specialtyRouter.get("", specialtyController.getAll);
specialtyRouter.get("/:id", specialtyController.getSpecialtyById);
specialtyRouter.post("",isAuthenticatedMiddleware, specialtyController.createSpecialty);
specialtyRouter.put("/:id",isAuthenticatedMiddleware, specialtyController.updateSpecialty);
specialtyRouter.delete("/:id",isAuthenticatedMiddleware, specialtyController.deleteSpecialty);

export default specialtyRouter; 
