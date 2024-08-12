import { User } from "../../data/entities/user";
import { CartItem } from "../../data/entities/cart-item";
import { ICartItem } from "../../domain/models/cart-item";
import { nanoid } from "nanoid";
import { Product } from "../../data/entities/product";
import { calculateDiscountedPrice, calculateTotal } from "../../utils/util";

export class CartController {
  async addToCart(
    userId: string,
    productId: string,
    quantity: number,
    product: Product
  ): Promise<ICartItem> {
    let cartItem = await CartItem.findOne({
      where: { userId: userId, productId },
    });

    if (cartItem) {
      // If exists, update quantity
      cartItem.dataValues.quantity += quantity;
      //   calculate discounted price
      const discountedPrice = calculateDiscountedPrice(
        product.dataValues.amount,
        product.dataValues.discountPercentage
      );
      const total = calculateTotal(discountedPrice, cartItem.quantity);

      cartItem.dataValues.discountPercentage =
        product.dataValues.discountPercentage;
      cartItem.dataValues.discountedPrice = discountedPrice;
      cartItem.dataValues.total = total;

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
        userId: userId,
        productId,
        quantity,
        discountedPrice,
        discountPercentage: product.dataValues.discountPercentage,
        total,
      });
    }
    return cartItem.toJSON<ICartItem>();
  }

  async getCartItems(userId: string) {
    const cartItems = await CartItem.findAll({
      where: { userId },
      include: [User, Product],
    });
    return cartItems;
  }
}
