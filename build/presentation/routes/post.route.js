"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/infrastructure/routes/post-routes.ts
const express_1 = require("express");
const post_controller_1 = require("../controllers/post.controller");
const is_authenticated_middleware_1 = require("../../shared/middlewares/is-authenticated.middleware");
const postController = new post_controller_1.PostsController();
const postRouter = (0, express_1.Router)();
postRouter.get("", postController.getAll);
postRouter.get("/:id", postController.getPostById);
postRouter.get("/slugs/:slug", postController.getPostBySlug);
postRouter.post("", is_authenticated_middleware_1.isAuthenticatedMiddleware, postController.createPost);
postRouter.put("/:id", is_authenticated_middleware_1.isAuthenticatedMiddleware, postController.updatePost);
postRouter.delete("/:id", is_authenticated_middleware_1.isAuthenticatedMiddleware, postController.deletePost);
exports.default = postRouter;
