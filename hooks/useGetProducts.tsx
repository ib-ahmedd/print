import { ProductsType } from "@types";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";

function useGetProducts(endpoint: string) {
  const [products, setProducts] = useState<any>();
  const [loading, setLoading] = useState(true);
  const apiLink = "https://print-server-wxgg.onrender.com/api";

  const getProducts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(apiLink + endpoint);
      setProducts(response.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  }, []);
  useEffect(() => {
    getProducts();
  }, [getProducts]);
  return { products, loading };
}

export default useGetProducts;
