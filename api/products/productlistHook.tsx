import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from './productService2';

export default function ProductList(page: number, hasMore: boolean) {
  return useQuery({
    queryKey: ['productList', page],
    queryFn: () => fetchProducts(page),
    staleTime: 5000,
    retry: 3,
    refetchOnWindowFocus: true,
    enabled: hasMore, // Disable query when there's no more data to fetch
  });
}
