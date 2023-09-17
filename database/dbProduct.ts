import { IProduct } from "@/interfaces";
import { db } from ".";
import { Product } from "@/models";

export const getProductsBySlug = async (
  slug: string
): Promise<IProduct | null> => {
  await db.connect();
  const product = await Product.findOne({ slug }).lean();
  await db.disconnect();

  if (!product) {
    return null;
  }

  return JSON.parse(JSON.stringify(product));
};

interface ProductSlug {
  slug: string;
}

export const getAllPorductSlugs = async (): Promise<ProductSlug[]> => {
  await db.connect();
  const slugs = await Product.find().select("slug -_id").lean();
  await db.disconnect();

  return slugs;
};

export const getProductsByTerm = async (term: string): Promise<IProduct[]> => {
  term = term.toString().toLocaleLowerCase();

  await db.connect();

  const products = await Product.find({
    $text: { $search: term },
  })
    .select("title images inStock price slug -_id")
    .lean();

  await db.disconnect();
  return products;
};
64;

export const getAllProduct = async (): Promise<IProduct[]> => {
  await db.connect();

  const products = await Product.find()
    .select("title images inStock price slug -_id")
    .lean();

  await db.disconnect();
  return products;
};
