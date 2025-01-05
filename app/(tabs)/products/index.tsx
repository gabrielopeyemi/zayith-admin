import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  ImageBackground,
  Dimensions,
  RefreshControl,
} from "react-native";
import { Link } from "expo-router";
import LoadingState from "@/components/loadingState";
import ProductList from "@/api/products/productlistHook";
import ProductHeader from "@/components/headers/ProductHeader";

interface Product {
  _id: string;
  name: string;
  imageUrl: string;
}

export default function Home() {
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false); // For pull-to-refresh
  const { height, width } = Dimensions.get("window");
  const [page, setPage] = useState<number>(1);
  const {
    data: products,
    isLoading,
    isError,
    error,
    refetch,
  } = ProductList(page, hasMore);

  // Refresh function for pull-to-refresh
  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      setPage(1); // Reset to the first page
      await refetch(); // Re-fetch data
      setHasMore(true); // Reset the 'hasMore' state
    } catch (error) {
      console.error("Error refreshing data:", error);
    } finally {
      setRefreshing(false);
    }
  }, [refetch]);

  const loadMore = useCallback(() => {
    if (!isLoading && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [isLoading, hasMore]);

  const renderItem = useCallback(
    ({ item }: { item: Product }) => (
      <Link
        href={{ pathname: "/products/[id]", params: { id: item._id } }}
        className="bg-pink rounded-lg m-1 flex-1 pb-2 overflow-hidden"
        style={{ marginHorizontal: 5 }}
      >
        <View className="flex-1">
          <ImageBackground
            source={{ uri: item.imageUrl }}
            className="flex-1 justify-center items-center w-full h-40"
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
    () => (
      <Text className="text-center text-gray-500 text-lg mt-5">
        No data available. Please try again later.
      </Text>
    ),
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
          Error: {error?.message || "An error occurred"}
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1">
      <ProductHeader  />
      <View className="flex-1 bg-gray-100 px-5">
        <FlatList
          data={products}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          ListEmptyComponent={handleEmpty}
          ListFooterComponent={renderFooter}
          // onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh} // Pull-to-refresh handler
              colors={["#6200EE"]} // Android indicator color
              tintColor="#6200EE" // iOS indicator color
            />
          }
        />
      </View>
    </View>
  );
}
