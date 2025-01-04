// src/api/products/productService.js
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
import { instance } from '../instance';
const [hasMore, setHasMore] = useState<boolean>(true);


export const fetchProducts = async (page:any) => {
  const limit=40
  const response = await instance.get(`/products/get-all-product?page=${page}&limit=${limit}`);
  return response.data;
};




export const createProduct = async (productData:any) => {
  const response = await instance.post('/products', productData);
  return response.data;
};

// const {
//   data:products,
//   isLoading,
//   isError,
//   error,
//   refetch

// }=