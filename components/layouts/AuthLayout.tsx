import { Box } from "@mui/material";
import Head from "next/head";
import { FC, PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  title: string;
  description: string;
}

export const AuthLayout: FC<Props> = ({ children, title, description }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <main>
        <Box
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          height={"calc(100vh - 200px)"}
        >
          {children}
        </Box>
      </main>
    </>
  );
};
