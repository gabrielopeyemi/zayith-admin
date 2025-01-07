// src/api/products/productService.js
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
import { instance } from '../instance';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '@/constants/config';
// const [hasMore, setHasMore] = useState<boolean>(true);



// export const getToken = async (storeId:any) => {
//   const token = await AsyncStorage.getItem('token');
//   if (!token) {
//     throw new Error('No authentication token found');
//   }

//   const response = await axios.get(`${API_URL}/order-management?storeId=${storeId}`, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//       'Content-Type': 'application/json',
//     },
//   });
//   return response.data;
// };

export const fetchProducts = async (page:any) => {
  const limit=40
  const response = await instance.get(`/products/get-all-product?page=${page}&limit=${limit}`);
  return response.data;
};



export const fetchOrders = async (page:any) => {
  const limit=40
  const response = await instance.get(`/products/get-all-product?page=${page}&limit=${limit}`);
  return response.data;
};

export const createProduct = async (productData:any) => {
  const response = await instance.post('/products', productData);
  return response.data;
};
