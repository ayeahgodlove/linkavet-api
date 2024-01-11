import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type CartItem = {
  id: string;
  quantity: number;
};

export interface ShoppingCartState {
  isOpen: boolean;
  cartItems: CartItem[];
  cartQuantity: number;
}

const initialState: ShoppingCartState = {
  isOpen: false,
  cartItems: [],
  cartQuantity: 0,
};

const shoppingCartSlice = createSlice({
  name: "shoppingCart",
  initialState,
  reducers: {
    openCart: (state) => {
      state.isOpen = true;
    },
    closeCart: (state) => {
      state.isOpen = false;
    },

    increaseCartQuantity: (state, action: PayloadAction<string>) => {
      const item = state.cartItems.find(
        (cartItem) => cartItem.id === action.payload
      );
      if (item) {
        item.quantity++;
      } else {
        state.cartItems.push({ id: action.payload, quantity: 1 });
      }
      state.cartQuantity++;
    },
    decreaseCartQuantity: (state, action: PayloadAction<string>) => {
      const item = state.cartItems.find(
        (cartItem) => cartItem.id === action.payload
      );
      if (item) {
        if (item.quantity === 1) {
          state.cartItems = state.cartItems.filter(
            (cartItem) => cartItem.id !== action.payload
          );
        } else {
          item.quantity--;
        }
        state.cartQuantity--;
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.cartItems = state.cartItems.filter(
        (cartItem) => cartItem.id !== action.payload
      );
      state.cartQuantity--;
    },
  },
});

// export const {
//   openCart,
//   closeCart,
//   getItemQuantity,
//   increaseCartQuantity,
//   decreaseCartQuantity,
//   removeFromCart,
// } = shoppingCartSlice.actions;
export const shoppingCartActions = shoppingCartSlice.actions;
export const shoppingCartReducer = shoppingCartSlice.reducer;
