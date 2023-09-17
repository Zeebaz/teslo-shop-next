import { CartList, OrderSummary } from "@/components/cart";
import { ShopLayout } from "@/components/layouts";
import {
  CreditCardOffOutlined,
  CreditScoreOutlined,
} from "@mui/icons-material";
import {
  Link,
  Typography,
  Grid,
  Card,
  Divider,
  Box,
  Button,
  Chip,
} from "@mui/material";
import NextLink from "next/link";
import React from "react";

const OrderPage = () => {
  return (
    <ShopLayout
      title={"Resumen de orden 324324"}
      pageDescription={"Resumen de la orden"}
    >
      <Typography variant="h1" component={"h1"}>
        Orden: 21333e
      </Typography>

      <Chip
        sx={{ my: 2 }}
        label="Orden ya fue pagada"
        variant="outlined"
        color="success"
        icon={<CreditScoreOutlined />}
      />
      {/*  <Chip
        sx={{ my: 2 }}
        label="Pendiente de pago"
        variant="outlined"
        color="error"
        icon={<CreditCardOffOutlined />}
      /> */}

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
              {/* TODO */}
              <h1>Pagar</h1>
              <Chip
                sx={{ my: 2 }}
                label="Orden ya fue pagada"
                variant="outlined"
                color="success"
                icon={<CreditScoreOutlined />}
              />
            </Box>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default OrderPage;
