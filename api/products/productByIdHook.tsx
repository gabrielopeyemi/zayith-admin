import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { instance } from '../instance';

const API_URL = 'your-api-url'; // Replace with actual API URL

// Type for the storeId
interface OrdersProps {
  storeId: any;
}
export const getProduct = async (productId: any): Promise<any> => {
  const token = await AsyncStorage.getItem("token");
  if (!token) {
    throw new Error("No authentication token found");
  }

  const response = await instance.get(`/products/${productId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
return response.data;
};

export default function GetProductById( productId:any){
    return useQuery({
      queryKey:['product',productId],
      queryFn:()=>getProduct(productId),
      staleTime: 5000,
      retry: 3,
      refetchOnWindowFocus: true,
    })
}

