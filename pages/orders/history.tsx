import { ShopLayout } from "@/components/layouts";
import React from "react";
import { Typography, Grid, Chip, Link } from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import NextLink from "next/link";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "fullname", headerName: "Nombre completo", width: 300 },

  {
    field: "paid",
    headerName: "Pagada",
    description: "Muestra informacion si esta pagada la orden o no",
    width: 200,
    sortable: false,
    renderCell: (params: GridValueGetterParams) => {
      return params.row.paid ? (
        <Chip color="success" label="Pagada" variant="outlined" />
      ) : (
        <Chip color="error" label="No Pagada" variant="outlined" />
      );
    },
  },
  {
    field: "link",
    headerName: "Mas detalles sobre la orden",
    description: "Muestra mas informacion sobre la orden",
    width: 200,
    sortable: false,
    renderCell: (params: GridValueGetterParams) => (
      <NextLink href={`/orders/${params.row.id}`} passHref legacyBehavior>
        <Link>Ver orden</Link>
      </NextLink>
    ),
  },
];

const rows = [
  { id: 1, paid: true, fullname: "NOmbre completo" },
  { id: 2, paid: true, fullname: "NOmbre completo" },
  { id: 3, paid: false, fullname: "NOmbre completo" },
  { id: 4, paid: true, fullname: "NOmbre completo" },
  { id: 5, paid: true, fullname: "NOmbre completo" },
];

const HistoryPage = () => {
  return (
    <ShopLayout
      title={"Historial de ordenes"}
      pageDescription={"Historial de ordenes del cliente"}
    >
      <Typography>Historial de ordenes</Typography>
      <Grid container>
        <Grid item xs={12} sx={{ height: 650, width: "100%" }}>
          <DataGrid columns={columns} rows={rows} pageSizeOptions={[2, 3, 6]} />
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default HistoryPage;
