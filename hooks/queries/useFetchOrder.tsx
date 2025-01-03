import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '@/constants/config';

// Create an instance of axios (or use your existing instance)
const instance = axios.create({
  baseURL: API_URL,
});

interface Order {
  // Define your order structure based on the API response
  id: string;
  status: string;
  total: number;
  items: any[];
}

interface UseFetchOrderResult {
  order: Order | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useFetchOrder = (orderId?: string): UseFetchOrderResult => {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchOrder = async () => {
    setLoading(true);
    setError(null);

    try {
      const response: any = await instance.get(`/order-management/single?orderId=${orderId}`);
      setOrder(response.data); // Assuming response.data contains the order
    } catch (err: any) {
      console.error('Error fetching order:', err);
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (orderId) {
      fetchOrder();
    }
  }, [orderId]);

  return { order, loading, error, refetch: fetchOrder };
};
