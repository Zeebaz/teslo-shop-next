import { currency } from "@/Utils";
import { CartContext } from "@/context";
import { Grid, Typography } from "@mui/material";
import { useContext } from "react";

export const OrderSummary = () => {
  const { subTotal, tax, total, numberOfItems } = useContext(CartContext);

  return (
    <Grid container>
      <Grid item xs={6}>
        <Typography>No. Productos:</Typography>
      </Grid>
      <Grid item xs={6} display={"flex"} justifyContent={"end"}>
        <Typography>{numberOfItems}</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography>Subtotal:</Typography>
      </Grid>
      <Grid item xs={6} display={"flex"} justifyContent={"end"}>
        <Typography>{currency.format(subTotal)}</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography>
          Impuestos ({Number(process.env.NEXT_PUBLIC_TAX_RATE || 0) * 100}%):
        </Typography>
      </Grid>
      <Grid item xs={6} display={"flex"} justifyContent={"end"}>
        <Typography>{currency.format(tax)}</Typography>
      </Grid>
      <Grid item xs={6} sx={{ mt: 2 }}>
        <Typography variant="subtitle1">Total:</Typography>
      </Grid>
      <Grid item xs={6} display={"flex"} justifyContent={"end"} sx={{ mt: 2 }}>
        <Typography variant="subtitle1">{currency.format(total)}</Typography>
      </Grid>
    </Grid>
  );
};
