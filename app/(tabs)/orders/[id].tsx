import { View, Text, SafeAreaView, ScrollView } from "react-native";
import React from "react";
// import HeaderComponent from "@/components/HeaderComponent";
// import OrderDetails from "@/components/OrderDetails";
import OrderDetailsTwo from "@/components/OrderDetailsTwo";
import { useFetchOrder } from "@/hooks/queries/useFetchOrder";
import { useLocalSearchParams } from "expo-router";
import LoadingState from "@/components/loadingState";

export default function SingleOrder() {
  const params = useLocalSearchParams();
  const {
    order,
    loading,
    error,
    refetch: fetchOrder,
  } = useFetchOrder(params?.id);

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
      <ScrollView
        style={{
          flex: 1,
        }}
      >
        <OrderDetailsTwo order={order} fetchOrder={fetchOrder} />
      </ScrollView>
    </SafeAreaView>
  );
}
