import { FC, PropsWithChildren, useEffect, useReducer, useRef } from "react";
import { CartContext, cartReducer } from "./";
import { ICartProduct } from "@/interfaces";
import Cookie from "js-cookie";

export interface CartState {
  cart: ICartProduct[];
}

const CART_INITIAL_STATE: CartState = {
  cart: [],
};

export const CartProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);
  const isReloading = useRef(true);

  useEffect(() => {
    try {
      const cookiesCart = JSON.parse(Cookie.get("cart") || "[]");
      dispatch({
        type: "[Cart] - LoadCart from cookies | storage",
        payload: cookiesCart,
      });
    } catch (error) {
      dispatch({
        type: "[Cart] - LoadCart from cookies | storage",
        payload: [],
      });
    }
  }, []);

  useEffect(() => {
    if (isReloading.current) {
      isReloading.current = false;
    } else {
      Cookie.set("cart", JSON.stringify(state.cart));
    }
  }, [state.cart]);

  const addProductToCart = (product: ICartProduct) => {
    dispatch({ type: "[Cart] - Add product", payload: product });
  };

  // otra forma de agregar productos
  const addProductToCart2 = (product: ICartProduct) => {
    // is new id and size
    const isProductInCart = state.cart.some(
      (productInCart) => productInCart._id === product._id
    );

    if (!isProductInCart)
      return dispatch({
        type: "[Cart] - Update products in cart",
        payload: [...state.cart, product],
      });

    // is new size
    const isProductInCartButDifferentSize = state.cart.some(
      (productInCart) =>
        productInCart._id === product._id && productInCart.size === product.size
    );

    if (!isProductInCartButDifferentSize)
      return dispatch({
        type: "[Cart] - Update products in cart",
        payload: [...state.cart, product],
      });

    // exists - update quantity
    let newProducts = state.cart.map((productInCart) => {
      if (productInCart._id !== product._id) return productInCart;
      if (productInCart.size !== product.size) return productInCart;

      productInCart.quantity += product.quantity;
      return productInCart;
    });

    return dispatch({
      type: "[Cart] - Update products in cart",
      payload: newProducts,
    });
  };

  const updateCartQuantity = (product: ICartProduct) => {
    dispatch({
      type: "[Cart] - Change product quantity",
      payload: product,
    });
  };

  return (
    <CartContext.Provider
      value={{
        ...state,
        addProductToCart,
        addProductToCart2,
        updateCartQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
