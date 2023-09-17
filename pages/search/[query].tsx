import { GetServerSideProps, NextPage } from "next";
import { ShopLayout } from "@/components/layouts";
import { ProductList } from "@/components/products";
import { Box, Typography } from "@mui/material";
import { dbProducts } from "@/database";
import { IProduct } from "@/interfaces";

interface Props {
  products: IProduct[];
  foundProducts: boolean;
  query: string;
}

const SearchPage: NextPage<Props> = ({ products, foundProducts, query }) => {
  return (
    <ShopLayout
      title={"Teslo-Shop - Search"}
      pageDescription={"Encuentra los mejroes productos en un solo lugar"}
    >
      <Typography variant="h1" component="h1">
        Busqueda de productos
      </Typography>

      {foundProducts ? (
        <Box display={"flex"}>
          <Typography variant="h2" sx={{ mb: 1 }}>
            Busqueda relacionada a: {query}
          </Typography>
          <Typography variant="h2" sx={{ mb: 1 }} textTransform={"capitalize"}>
            {query}
          </Typography>
        </Box>
      ) : (
        <Box display={"flex"}>
          <Typography variant="h2" sx={{ mb: 1 }}>
            No encontramos ningun productos relacionado a:
          </Typography>
          <Typography
            variant="h2"
            sx={{ ml: 1 }}
            color={"secondary"}
            textTransform={"capitalize"}
          >
            {query}
          </Typography>
        </Box>
      )}

      <ProductList products={products} />
    </ShopLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { query = "" } = params as { query: string };

  if (query.length === 0) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  let products = await dbProducts.getProductsByTerm(query);
  const foundProducts = products.length > 0;

  if (!foundProducts) {
    products = await dbProducts.getAllProduct();
  }

  return {
    props: {
      products,
      foundProducts,
      query,
    },
  };
};

export default SearchPage;
