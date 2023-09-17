import { ICartProduct } from "@/interfaces";
import { CartState } from ".";
import { Product } from "@/models";

type CartActionType =
  | {
      type: "[Cart] - LoadCart from cookies | storage";
      payload: ICartProduct[];
    }
  | { type: "[Cart] - Add product"; payload: ICartProduct }
  | { type: "[Cart] - Change product quantity"; payload: ICartProduct }
  | { type: "[Cart] - Update products in cart"; payload: ICartProduct[] };

export const cartReducer = (
  state: CartState,
  action: CartActionType
): CartState => {
  switch (action.type) {
    case "[Cart] - LoadCart from cookies | storage":
      return { ...state, cart: action.payload };

    case "[Cart] - Add product": {
      const isProductInCart = state.cart.find(
        (product) =>
          product._id === action.payload._id &&
          product.size === action.payload.size
      );

      let newProducts = state.cart;

      if (isProductInCart) {
        newProducts = state.cart.map((product) => {
          if (
            product._id !== action.payload._id &&
            product.size !== action.payload.size
          )
            return product;
          return {
            ...product,
            quantity: product.quantity + action.payload.quantity,
          };
        });
      } else {
        newProducts = [...state.cart, action.payload];
      }

      return { ...state, cart: newProducts };
    }

    case "[Cart] - Update products in cart":
      return {
        ...state,
        cart: action.payload,
      };

    case "[Cart] - Change product quantity":
      return {
        ...state,
        cart: state.cart.map((product) => {
          if (product._id !== action.payload._id) return product;
          if (product.size !== action.payload.size) return product;

          return action.payload;
        }),
      };

    default:
      return state;
  }
};