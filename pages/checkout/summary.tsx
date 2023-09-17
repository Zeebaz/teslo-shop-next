import { CartList, OrderSummary } from "@/components/cart";
import { ShopLayout } from "@/components/layouts";
import {
  Typography,
  Grid,
  Card,
  Divider,
  Box,
  Button,
  Link,
} from "@mui/material";
import NextLink from "next/link";

const SummaryPage = () => {
  return (
    <ShopLayout
      title={"Resumen de compra"}
      pageDescription={"Resumen de la compra"}
    >
      <Typography variant="h1" component={"h1"}>
        Resumen de la orden
      </Typography>
      <Grid container>
        <Grid item xs={12} sm={7}>
          <CartList />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card className={"summary-card"} sx={{ padding: 2 }}>
            <Typography variant="h2">Resumen (3 productos)</Typography>
            <Divider sx={{ my: 1 }} />

            <Box display={"flex"} justifyContent={"space-between"}>
              <Typography variant="subtitle1">Direccion de entrega</Typography>
              <NextLink href={"/checkout/address"} legacyBehavior passHref>
                <Link underline="always">Edit</Link>
              </NextLink>
            </Box>

            <Typography>Jairo Ramierz</Typography>
            <Typography>34dfds</Typography>
            <Typography>Zona 3</Typography>
            <Typography>435435643</Typography>

            <Divider sx={{ my: 1 }} />

            <Box display={"flex"} justifyContent={"end"}>
              <NextLink href={"/cart"} legacyBehavior passHref>
                <Link underline="always">Edit</Link>
              </NextLink>
            </Box>

            <OrderSummary />

            <Box sx={{ mt: 3 }}>
              <Button color="secondary" className="circular-btn" fullWidth>
                Confirma orden
              </Button>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default SummaryPage;
