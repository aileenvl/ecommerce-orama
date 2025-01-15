import { OramaClient } from "@oramacloud/client";

const client = new OramaClient({
  endpoint: import.meta.env.VITE_ORAMA_ENDPOINT || "",
  api_key: import.meta.env.VITE_ORAMA_API_KEY || "",
});

export const searchProducts = async (
  searchTerm: string,
  priceRange: number,
  selectedBrand: string,
  selectedSize: string,
  selectedCategory: string,
  offset: number = 0,
  limit: number = 9
) => {
  const where: Record<string, any> = {
    selling_price: {
      lt: priceRange,
    },
  };

  if (selectedBrand) {
    where.brand = selectedBrand;
  }

  if (selectedSize) {
    where.sizes = selectedSize;
  }

  if (selectedCategory) {
    where.category = selectedCategory;
  }

  const results = await client.search({
    term: searchTerm,
    mode: "fulltext",
    where,
    offset: Math.floor(offset),
    limit: Math.floor(limit),
  });
  console.log(results);
  return results;
};