// src/api/products/productService.js
import axiosInstance from '../utils/axios';

export const fetchProducts = async () => {
  const response = await axiosInstance.get('/api/products');
  return response.data;
};

export const createProduct = async (productData) => {
  const response = await axiosInstance.post('/api/products', productData);
  return response.data;
};
api/products/productService.ts