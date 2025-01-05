import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL, storeId } from "@/constants/config";
import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Custom hook to fetch products from an API with authentication headers.
 * @returns {object} - { products, error, loading }
 */
export const useGetSingleProducts = (productId?: string | null) => {
  const [product, setProduct] = useState<any | null>(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);

    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await axios.get(`${API_URL}/products/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log({ response });

      setProduct(response.data);
    } catch (err: any) {
      setError(err.message || "An error occurred while fetching products.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  return { product, error, loading };
};
