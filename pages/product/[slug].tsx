import { ShopLayout } from "@/components/layouts";
import { ProductSizeSelector, ProductSlideShow } from "@/components/products";
import { ItemCounter } from "@/components/ui";
import { getAllPorductSlugs, getProductsBySlug } from "@/database/dbProduct";
import { IProduct, ISize } from "@/interfaces";
import { Box, Button, Chip, Grid, Typography } from "@mui/material";
import { NextPage, GetStaticProps, GetStaticPaths } from "next";
import { useState, useContext } from "react";
import { ICartProduct } from "../../interfaces/cart";
import { useRouter } from "next/router";
import { CartContext } from "@/context";

interface Props {
  product: IProduct;
}

const ProductPage: NextPage<Props> = ({ product }) => {
  const router = useRouter();
  const { addProductToCart2 } = useContext(CartContext);

  const [tempCartProduct, setTempCartProduct] = useState<ICartProduct>({
    _id: product._id,
    image: product.images[0],
    price: product.price,
    size: undefined,
    slug: product.slug,
    title: product.title,
    gender: product.gender,
    quantity: 1,
  });

  const onSeletedSize = (size: ISize) => {
    setTempCartProduct((prev) => ({
      ...prev,
      size,
    }));
  };

  const onUpdateQuantity = (quantity: number) => {
    setTempCartProduct((prev) => ({
      ...prev,
      quantity,
    }));
  };

  const onAddProduct = () => {
    if (!tempCartProduct.size) return;
    addProductToCart2(tempCartProduct);
    console.log({ tempCartProduct });
    router.push("/cart");
  };

  return (
    <ShopLayout title={product.title} pageDescription={product.description}>
      <Grid container rowSpacing={3}>
        <Grid item xs={12} sm={7} padding={"60px"}>
          <ProductSlideShow images={product.images} />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Box display="flex" flexDirection="column">
            {/* titles */}
            <Typography variant="h1" component="h1">
              {product.title}
            </Typography>
            <Typography variant="subtitle1" component="h2">
              ${product.price}
            </Typography>
            {/* cantidades */}

            <Box sx={{ my: 2 }}>
              <Typography variant="subtitle2" component="h2">
                Cantidad
              </Typography>
              <ItemCounter
                currentValue={tempCartProduct.quantity}
                updateQuantity={onUpdateQuantity}
                maxValue={product.inStock > 10 ? 10 : product.inStock}
              />
              <ProductSizeSelector
                selectedSize={tempCartProduct.size}
                sizes={product.sizes}
                onSelectedSize={onSeletedSize}
              />
            </Box>

            {product.inStock > 0 ? (
              <Button
                color="secondary"
                className="circular-btn"
                onClick={() => onAddProduct()}
              >
                {tempCartProduct.size
                  ? "Agregar al carrito"
                  : "Seleccione una talla"}
              </Button>
            ) : (
              <Chip
                label="No hay disponibles"
                color="error"
                variant="outlined"
              />
            )}

            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle2">Descripcion</Typography>
              <Typography variant="body2">{product.description}</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const slugs = await getAllPorductSlugs();

  return {
    paths: slugs.map(({ slug }) => ({
      params: {
        slug,
      },
    })),
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params as { slug: string };
  const product = await getProductsBySlug(`${slug}`);

  if (!product) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      product,
    },
    revalidate: 60 * 60 * 24,
  };
};

/* export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { slug } = query as { slug: string };
  const product = await getProductsBySlug(`${slug}`)
  if (!product) { 
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      product,
    }
  };
}; */

export default ProductPage;
