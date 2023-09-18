import { ICartProduct } from "@/interfaces";
import { createContext } from "react";

interface ContextProps {
  cart: ICartProduct[];
  numberOfItems: number;
  subTotal: number;
  tax: number;
  total: number;

  // METHODS
  addProductToCart: (product: ICartProduct) => void;
  addProductToCart2: (product: ICartProduct) => void;
  updateCartQuantity: (product: ICartProduct) => void;
  removeCartProducto: (product: ICartProduct) => void;
}

export const CartContext = createContext({} as ContextProps);
