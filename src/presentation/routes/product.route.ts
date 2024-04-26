// src/infrastructure/routes/product-routes.ts
import { Router } from "express";
import { ProductsController } from "../controllers/product.controller";
import { isAuthenticatedMiddleware } from "../../shared/middlewares/is-authenticated.middleware";

const productController = new ProductsController();

const productRouter = Router();

productRouter.get("", productController.getAll);
productRouter.get("/search", productController.search);
productRouter.get("/:id", productController.getProductById);
productRouter.get("/:categoryId", productController.getProductsByCategory);
productRouter.post(
  "",
  isAuthenticatedMiddleware,
  isAuthenticatedMiddleware,
  productController.createProduct
);
productRouter.put(
  "/:id",
  isAuthenticatedMiddleware,
  isAuthenticatedMiddleware,
  productController.updateProduct
);
productRouter.delete(
  "/:id",
  isAuthenticatedMiddleware,
  productController.deleteProduct
);

export default productRouter;
