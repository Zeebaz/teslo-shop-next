import { ShopLayout } from "@/components/layouts";
import { ProductList } from "@/components/products";
import { useProducts } from "@/hooks";
import {
  Typography,
} from "@mui/material";
import FullScreenLoading from "@/components/ui/FullScreenLoading";

export default function MenPage() {
  const { products, isError, isLoading } = useProducts("/products?gender=men");

  return (
    <ShopLayout
      title={"Teslo-Shop - Men"}
      pageDescription={"Encuentra los mejores productos de hombre"}
    >
      <Typography variant="h1" component="h1">
        Tienda
      </Typography>
      <Typography variant="h2" sx={{ mb: 1 }}>
        Productos para hombre
      </Typography>


      {isLoading ? <FullScreenLoading /> : <ProductList products={products} />}
    </ShopLayout>
  );
}
