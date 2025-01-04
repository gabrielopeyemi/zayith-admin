import React from "react";
import { TouchableOpacity, View, Text, FlatList, ActivityIndicator } from "react-native";
import { router } from "expo-router";
import Entypo from "@expo/vector-icons/Entypo";
import { OrderStatus, storeId } from "@/constants/config";
import Orders from "@/api/products/ordersHook"; // Assuming this is where your query hook is

export default function Order() {
  // Using the Orders hook with storeId to get orders
  const { data: orders, isLoading, isError, error, refetch } = Orders(storeId);

  const renderItem = ({ item }: any) => (
    <TouchableOpacity onPress={() => router.replace(`/orders/${item?._id}`)}>
      <View className="p-4 bg-white border border-gray-200 rounded-lg mb-2">
        <View className="flex flex-row gap-2">
          <Text className="text-gray-700">{item?.customer?.firstName}</Text>
          <Text className="text-gray-700">{item?.customer?.lastName}</Text>
        </View>
        <Text className="mt-2 font-semibold text-lg text-gray-800">
          NGN{item?.totalAmount}
        </Text>

        <View className="mt-2 flex justify-end">
          {item?.status === OrderStatus.ORDER_PLACED && (
            <Text className="bg-yellow-600 text-white px-2 py-1 rounded text-xs flex flex-row items-center gap-1">
              <Entypo name="unread" size={10} color="white" />
              NOT PAID
            </Text>
          )}
          {(item?.status === OrderStatus.USER_HAS_PAID ||
            item?.status === OrderStatus.ORDER_READY_FOR_PICKUP) && (
            <Text className="bg-green-600 text-white px-2 py-1 rounded text-xs">
              PAID
            </Text>
          )}
          {item?.status === OrderStatus.ORDER_IN_TRANSIT && (
            <Text className="bg-green-600 text-white px-2 py-1 rounded text-xs">
              Has Delivered
            </Text>
          )}
          {item?.status === OrderStatus.ORDER_IN_TRANSIT && (
            <Text className="bg-red-600 text-white px-2 py-1 rounded text-xs">
              Has Returned
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  const handleEmpty = () => (
    <Text className="text-center text-gray-500 text-lg mt-5">
      No data available. Please try again later.
    </Text>
  );

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="green" />
        <Text className="mt-2 text-lg text-gray-600">Loading...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-red-600 text-lg text-center">
          Error: {error?.message}
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-100 p-4">
      <FlatList
        data={orders || []} // Ensure it's not undefined or null
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={handleEmpty}
        ItemSeparatorComponent={() => <View className="my-2" />}
        ListFooterComponent={() => (
          <View className="items-center mt-4">
            <Text className="text-gray-600">List ended</Text>
          </View>
        )}
      />
    </View>
  );
}
