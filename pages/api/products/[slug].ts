import { db } from "@/database";
import { IProduct } from "@/interfaces";
import { Product } from "@/models";
import type { NextApiRequest, NextApiResponse } from "next";

type Data =
  | {
      message: string;
    }
  | IProduct;

export default function (req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case "GET":
      return getProductBySlug(req, res);

    default:
      return res.status(400).json({ message: "Metodo no encontrado." });
  }
}

async function getProductBySlug(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { slug } = req.query;
  await db.connect();

  const productBySlug = <IProduct>(
    await Product.findOne({ slug })
      .select("title images price inStock slug -_id")
      .lean()
  );

  await db.disconnect();
  if (!productBySlug?.slug) {
    await db.disconnect();
    return res.status(404).json({ message: "No hay resultados de " + slug });
  }

  return res.status(200).json(productBySlug);
}
