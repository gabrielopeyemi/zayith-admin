import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  RefreshControl,
} from "react-native";
import React, { useState } from "react";
import OrderDetailsTwo from "@/components/OrderDetailsTwo";
import { useFetchOrder } from "@/hooks/queries/useFetchOrder";
import { useLocalSearchParams } from "expo-router";
import LoadingState from "@/components/loadingState";
import HeaderComponent from "@/components/headers/HeaderComponent";

export default function SingleOrder() {
  const [refreshing, setRefreshing] = useState(false);
  const params = useLocalSearchParams();
  const {
    order,
    loading,
    error,
    refetch: fetchOrder,
  } = useFetchOrder(params?.id);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchOrder(); // Refetch the order data
    setRefreshing(false);
  };

  if (loading) {
    return <LoadingState />;
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#f8f9fa",
      }}
    >
      <HeaderComponent title={`#${order?.orderNumber}`} link={"/products"} />
      <ScrollView
        style={{
          flex: 1,
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <OrderDetailsTwo order={order} fetchOrder={onRefresh} />
      </ScrollView>
    </SafeAreaView>
  );
}
