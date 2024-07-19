import { Request, Response } from "express";
import { User } from "../../data/entities/user";
import { CartItem } from "../../data/entities/cart-item";
import { ICartItem } from "../../domain/models/cart-item";
import { nanoid } from "nanoid";
import { Product } from "../../data/entities/product";
import { calculateDiscountedPrice, calculateTotal } from "../../utils/util";

export class CartController {
  async addToCart(req: Request, res: Response<any>): Promise<void> {
    const user = req.user as User;
    const { productId, quantity } = req.body;

    let product = await Product.findByPk(productId);

    if (!product) {
      res.status(404).json({
        validationErrors: [],
        success: false,
        data: null,
        message: "Product not found!",
      });
    } else {
      try {
        let cartItem = await CartItem.findOne({
          where: { userId: user.id, productId },
        });

        if (cartItem) {
          // If exists, update quantity
          cartItem.quantity += quantity;
          //   calculate discounted price
          const discountedPrice = calculateDiscountedPrice(
            product.dataValues.amount,
            product.dataValues.discountPercentage
          );
          const total = calculateTotal(discountedPrice, cartItem.quantity);

          cartItem.discountPercentage = product.dataValues.discountPercentage;
          cartItem.discountedPrice = discountedPrice;
          cartItem.total = total;

          await cartItem.save();
        } else {
          //   calculate discounted price
          const discountedPrice = calculateDiscountedPrice(
            product.dataValues.amount,
            product.dataValues.discountPercentage
          );
          const total = calculateTotal(discountedPrice, quantity);

          // If not exists, create new cart item
          cartItem = await CartItem.create<CartItem>({
            id: nanoid(10),
            userId: user.id,
            productId,
            quantity,
            discountedPrice,
            discountPercentage: product.dataValues.discountPercentage,
            total,
          });
        }
        res.status(201).json({
          data: cartItem.toJSON<ICartItem>(),
          message: "Item Added to Cart Successfully!",
          validationErrors: [],
          success: true,
        });
      } catch (error: any) {
        res.status(400).json({
          data: null,
          message: error.message,
          validationErrors: [],
          success: false,
        });
      }
    }
  }

  async removeCartItem(req: Request, res: Response<any>): Promise<void> {
    const user = req.user as User;
    const userId = user.id;
    const itemId = req.params.itemId;

    try {
      const cartItem = await CartItem.findByPk(itemId);
      if (!cartItem || cartItem.userId !== userId) {
        res.status(404).json({
          message: "Item not found in cart",
          success: false,
          data: null,
          validationErrors: [],
        });
      } else {
        await cartItem.destroy();
        res.json({
          message: "Item removed from cart",
          success: true,
          data: null,
          validationErrors: [],
        });
      }
    } catch (error: any) {
      res.status(500).json({
        message: "Internal server error",
        success: false,
        data: null,
        validationErrors: [],
      });
    }
  }

  async getCartItems(req: Request, res: Response<any>): Promise<void> {
    const user = req.user as User;
    const userId = user.id;

    try {
      const cartItems = await CartItem.findAll({
        where: { userId },
        include: [User, Product],
      });
      res.json(cartItems);
    } catch (error: any) {
      res.status(500).json({
        data: null,
        message: error.message,
        validationErrors: [],
        success: false,
      });
    }
  }

  async clearCartItems(req: Request, res: Response<any>): Promise<void> {
    const user = req.user as User;
    const userId = user.id;

    try {
      await CartItem.destroy({
        where: { userId },
      });
      res.json({
        message: "Cart cleared",
        success: true,
        data: null,
        validationErrors: [],
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
        success: false,
        data: null,
        validationErrors: [],
      });
    }
  }
}
