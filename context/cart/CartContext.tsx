import { ICartProduct } from "@/interfaces";
import { createContext } from "react";

interface ContextProps {
  cart: ICartProduct[];
  addProductToCart: (product: ICartProduct) => void;
  addProductToCart2: (product: ICartProduct) => void;
  updateCartQuantity: (product: ICartProduct) => void
}

export const CartContext = createContext({} as ContextProps);
