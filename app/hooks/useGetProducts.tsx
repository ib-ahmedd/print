import { ProductsType } from "@types";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";

function useGetProducts(endpoint: string) {
  const [products, setProducts] = useState<ProductsType[]>([]);
  const [loading, setLoading] = useState(true);
  const apiLink = "http://localhost:4000/api";

  const getProducts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(apiLink + endpoint);
      console.log(response);
      setProducts(response.data);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  }, []);
  useEffect(() => {
    getProducts();
  }, [getProducts]);
  return { products, loading };
}

export default useGetProducts;
