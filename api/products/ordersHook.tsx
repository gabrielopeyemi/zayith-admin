import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Instance } from '../instance';

const API_URL = 'your-api-url'; // Replace with actual API URL

// Type for the storeId
interface OrdersProps {
  storeId: any;
}
export const getToken = async (storeId: string): Promise<any> => {
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await Instance.get(`/order-management?storeId=${storeId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
  return response.data;
};

export default function Orders( storeId:any){
    return useQuery({
      queryKey:['Orders',storeId],
      queryFn:()=>getToken(storeId),
      staleTime: 5000,
      retry: 3,
      refetchOnWindowFocus: true,
    })
}

