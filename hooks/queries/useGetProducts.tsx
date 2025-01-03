import { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL, storeId } from '@/constants/config';

interface Product {
  _id: string;
  name: string;
  category_name: string;
  imageUrl: string;
  created: string; // Adjust the type based on your actual data structure
  [key: string]: any; // To handle additional fields dynamically
}

interface UseGetProductsResult {
  products: Product[];
  error: string | null;
  loading: boolean;
}

export const useGetProducts = (): UseGetProductsResult => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
          throw new Error('No authentication token found');
        }

        const response = await axios.get<Product[]>(`${API_URL}/products/get-all-product/${storeId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        setProducts(response.data);
      } catch (err) {
        console.log({err})
        // const axiosError = err as AxiosError;
        setError('An error occurred while fetching products.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { products, error, loading };
};
