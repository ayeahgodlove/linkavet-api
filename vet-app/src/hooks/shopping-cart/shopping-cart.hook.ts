import { useProduct } from "hooks/product.hook";
import { useLocalStorage } from "hooks/shared/local-storage.hook";
import { IProduct, emptyProduct } from "models/product.model";
import { useDispatch, useSelector } from "react-redux";
import {
  CartItem,
  shoppingCartActions,
} from "redux/shared/shopping-cart.slice";
import { IRootState } from "redux/store";

const useShoppingCart = () => {
  const isOpen = useSelector<IRootState, boolean>(
    (state) => state.shoppingCart.isOpen
  );
  const cartItems = useSelector<IRootState, CartItem[]>(
    (state) => state.shoppingCart.cartItems
  );
  const cartQuantity = useSelector<IRootState, number>(
    (state) => state.shoppingCart.cartQuantity
  );

  const { products } = useProduct();

  const dispatch = useDispatch();

  const openCart = () => dispatch(shoppingCartActions.openCart);
  const closeCart = () => dispatch(shoppingCartActions.closeCart);

  function getItemQuantity(id: string) {
    const quantity = cartItems.find((item) => item.id === id)?.quantity || 0;
    if (quantity) {
      return quantity;
    } else {
      return 0;
    }
  }

  const increaseCartQuantity = (id: string) =>
    dispatch(shoppingCartActions.increaseCartQuantity(id));
  const decreaseCartQuantity = (id: string) =>
    dispatch(shoppingCartActions.decreaseCartQuantity(id));
  const removeFromCart = (id: string) =>
    dispatch(shoppingCartActions.removeFromCart(id));

  function findMatchingProducts(array1: IProduct[], array2: CartItem[]) {
    const matchingProducts: IProduct[] = [];

    if (array1.length === 0 || array2.length === 0) {
      matchingProducts.push({
        ...emptyProduct,
      });
      return matchingProducts;
    }
    for (const product of array1) {
      const found = array2.find((item) => item.id === product.id);
      if (found) {
        matchingProducts.push({
          ...product,
          qtty: found.quantity,
          amount: found.quantity * product.amount,
        });
      }
    }

    return matchingProducts;
  }

  const matchingProducts = findMatchingProducts(products, cartItems);
  const totalAmount =
    matchingProducts.map((p) => p.amount).reduce((a, b) => a + b) *
    cartQuantity;
    console.log("matchingProducts: ", matchingProducts)
  const totalQtty = matchingProducts.reduce((a, b) => a + b.qtty, 0);

  return {
    isOpen,
    cartItems,
    cartQuantity,
    openCart,
    closeCart,
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
    findMatchingProducts,
    matchingProducts,
    totalAmount,
    totalQtty,
  };
};

export { useShoppingCart };
