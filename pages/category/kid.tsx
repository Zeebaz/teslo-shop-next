import { ShopLayout } from "@/components/layouts";
import { ProductList } from "@/components/products";
import { useProducts } from "@/hooks";
import {
  Typography,
} from "@mui/material";
import FullScreenLoading from "@/components/ui/FullScreenLoading";

export default function KidsPage() {
  const { products, isError, isLoading } = useProducts("/products?gender=kid");

  return (
    <ShopLayout
      title={"Teslo-Shop - Kid"}
      pageDescription={"Encuentra los mejores productos de ninos"}
    >
      <Typography variant="h1" component="h1">
        Tienda
      </Typography>
      <Typography variant="h2" sx={{ mb: 1 }}>
        Productos para ninos
      </Typography>


      {isLoading ? <FullScreenLoading /> : <ProductList products={products} />}
    </ShopLayout>
  );
}
