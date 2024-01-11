import { useQuery } from "react-query";

export const useSearchProducts = (value: string) => {
  const { data, isLoading, error } = useQuery(
    ["search/products", value],
    async () => {
      if (value.length > 0) {
        const response = await fetch(
          `/api/products/search/?searchTerm=${value}`
        );
        const products = await response.json();
        return products;
      }
    }
  );
  return { data, isLoading, error };
};
