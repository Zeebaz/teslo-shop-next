import { ShopLayout } from "@/components/layouts";
import { ProductList } from "@/components/products";
import { useProducts } from "@/hooks";
import {
  Typography,
} from "@mui/material";
import FullScreenLoading from "@/components/ui/FullScreenLoading";

export default function WomenPage() {
  const { products, isError, isLoading } = useProducts("/products?gender=women");

  return (
    <ShopLayout
      title={"Teslo-Shop - Women"}
      pageDescription={"Encuentra los mejores productos de mujer"}
    >
      <Typography variant="h1" component="h1">
        Tienda
      </Typography>
      <Typography variant="h2" sx={{ mb: 1 }}>
        Productos para mujer
      </Typography>


      {isLoading ? <FullScreenLoading /> : <ProductList products={products} />}
    </ShopLayout>
  );
}
