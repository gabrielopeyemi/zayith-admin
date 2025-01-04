import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL, storeId } from '@/constants/config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { instance } from '@/api/instance';

/**
 * Custom hook to fetch orders from an API with authentication headers.
 * @returns {object} - { orders, error, loading }
 */
export const useGetOrders = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError(null);

      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
          throw new Error('No authentication token found');
        }

        const response = await instance.get(`/order-management?storeId=${storeId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        console.log({ response });

        setOrders(response.data);
      } catch (err) {
        setError(err.message || 'An error occurred while fetching orders.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return { orders, error, loading };
};
