import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, ActivityIndicator, Image, Dimensions } from 'react-native';
import { Link } from 'expo-router';
import LoadingState from '@/components/loadingState';
import ProductList from '@/api/products/productlistHook';


interface Product {
  _id: string;
  name: string;
  imageUrl: string;
}

export default function Home() {
  const [hasMore, setHasMore] = useState<boolean>(true);
  const { height, width } = Dimensions.get('window');
  const [page, setPage] = useState<number>(1);
  const { data: products, isLoading, isError, error, refetch } = ProductList(page, hasMore);

  const loadMore = useCallback(() => {
    if (!isLoading) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [isLoading]);

  const renderItem = useCallback(
    ({ item }: { item: Product }) => (
      <Link
        href={{ pathname: '/products/[id]', params: { id: item._id } }}
        className="bg-pink rounded-lg m-1 w-full pb-2 overflow-hidden"
      >
        <View className="flex-1">
          <Image
            className="self-center w-full h-[20vh]"
            source={{ uri: item.imageUrl }}
            resizeMode="cover"
          />
          <Text className="text-sm font-semibold text-gray-800 mt-3 px-2">
            {item.name}
          </Text>
        </View>
      </Link>
    ),
    [width, height]
  );

  const handleEmpty = useCallback(
    () => <Text className="text-center text-gray-500 text-lg mt-5">No data available. Please try again later.</Text>,
    []
  );

  const renderFooter = useCallback(
    () =>
      isLoading ? (
        <View className="items-center mt-3 mb-5">
          <ActivityIndicator size="small" color="#666" />
        </View>
      ) : null,
    [isLoading]
  );

  if (isLoading && page === 1) {
    return <LoadingState />;
  }

  if (isError) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-lg text-red-500 text-center">
          Error: {error?.message || 'An error occurred'}
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-100 px-5">
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        ListFooterComponent={renderFooter}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
}
