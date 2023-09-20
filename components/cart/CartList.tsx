import { initialData } from "@/database/seed-data";
import {
  Box,
  Button,
  CardActionArea,
  CardMedia,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import NextLink from "next/link";
import { ItemCounter } from "../ui";
import { FC, useContext } from "react";
import { CartContext } from "@/context";
import { ICartProduct } from "@/interfaces";

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
];

interface Props {
  editable?: boolean;
}

export const CartList: FC<Props> = ({ editable = false }) => {
  const { cart, updateCartQuantity, removeCartProducto } =
    useContext(CartContext);

  const onUpdateQuantity = (quantity: number) => {};

  const onNewCartQuantity = (
    product: ICartProduct,
    newQuantityValue: number
  ) => {
    product.quantity = newQuantityValue;
    updateCartQuantity(product);
  };

  return (
    <>
      {cart.map((product) => (
        <Grid
          container
          key={product.slug + product.size}
          spacing={2}
          sx={{ mb: 1 }}
        >
          <Grid item xs={3}>
            {/* TODO: llevar a la pagina del producto */}
            <NextLink href={`/product/${product.slug}`} passHref legacyBehavior>
              <Link>
                <CardActionArea>
                  <CardMedia
                    image={`/products/${product.image}`}
                    component={"img"}
                    sx={{ borderRadius: "5px" }}
                  />
                </CardActionArea>
              </Link>
            </NextLink>
          </Grid>
          <Grid item xs={7}>
            <Box display={"flex"} flexDirection={"column"}>
              <Typography variant="body1">{product.title}</Typography>
              <Typography variant="body1">
                Talla: <strong>{product.size}</strong>{" "}
              </Typography>

              {editable ? (
                <ItemCounter
                  currentValue={product.quantity}
                  updateQuantity={(value) => onNewCartQuantity(product, value)} //recibe el paremetro de la funcion updateQuantity
                  maxValue={10}
                />
              ) : (
                <Typography variant="body1">
                  Cantidad de productos: <strong>{product.quantity}</strong>{" "}
                </Typography>
              )}
            </Box>
          </Grid>
          <Grid
            item
            xs={2}
            display={"flex"}
            alignItems={"center"}
            flexDirection={"column"}
          >
            <Typography>{`$${product.price}`}</Typography>
            {editable && (
              <Button
                variant="text"
                color="secondary"
                onClick={() => {
                  removeCartProducto(product);
                }}
              >
                Remover
              </Button>
            )}
          </Grid>
        </Grid>
      ))}
    </>
  );
};
