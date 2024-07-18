import { ProductsType } from "@types";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";

function usePostProducts(
  endpoint: string,
  state: State
): {
  pageData: FetchData | undefined;
  loading: boolean;
} {
  const [loading, setLoading] = useState(true);
  const [pageData, setPageData] = useState<FetchData>();
  const apiLink = "http://localhost:4000/api";

  console.log(state);
  const getProducts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.post(apiLink + endpoint, state);
      const { data }: { data: FetchData } = response;
      setPageData(data);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  }, [state]);

  useEffect(() => {
    getProducts();
  }, [getProducts]);
  return { pageData, loading };
}

interface FetchData {
  products: ProductsType[];
  hotDeals: ProductsType[];
  productsCategories: string[];
  productsCount: number;
  categoriesCount: any;
}
interface State {
  page: number;
  sortOption: string;
  priceRange: number;
  selectedCategory: string;
}

export default usePostProducts;
