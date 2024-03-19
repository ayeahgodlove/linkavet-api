"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/infrastructure/routes/user-routes.ts
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const is_authenticated_middleware_1 = require("../../shared/middlewares/is-authenticated.middleware");
const multer_config_1 = require("../../shared/helper/multer.config");
const multer_1 = __importDefault(require("multer"));
const userController = new user_controller_1.UsersController();
const userRouter = (0, express_1.Router)();
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/uploads/avatars");
    },
    filename: (req, file, cb) => {
        const originalname = file.originalname;
        const filename = `${Date.now()}-${originalname
            .replace(/\s+/g, "")
            .toLowerCase()}`;
        cb(null, filename);
    },
});
const upload = (0, multer_1.default)({
    storage: storage,
    fileFilter: multer_config_1.fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 },
});
userRouter.get("", userController.getAll);
userRouter.get("/me", is_authenticated_middleware_1.isAuthenticatedMiddleware, (req, res) => {
    try {
        const user = req.user;
        res.status(200).json({
            message: "Success",
            success: true,
            data: user,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Failure!",
            success: false,
            errors: error.message,
        });
    }
});
userRouter.post("", userController.createUser);
userRouter.put("/activation", userController.activateUser);
userRouter.put("/:id", is_authenticated_middleware_1.isAuthenticatedMiddleware, userController.updateUser);
userRouter.delete("/:id", is_authenticated_middleware_1.isAuthenticatedMiddleware, userController.deleteUser);
// upload user avatar image
userRouter.post("/upload/:id", is_authenticated_middleware_1.isAuthenticatedMiddleware, upload.single("avatar"), userController.uploadAvatar);
userRouter.post("/:userId/roles/:roleId", is_authenticated_middleware_1.isAuthenticatedMiddleware, userController.addUserRole);
exports.default = userRouter;
