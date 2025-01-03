import { useGetOrders } from "@/hooks/queries/useGetOrders";
import { useGetProducts } from "@/hooks/queries/useGetProducts";
import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Image,
} from "react-native";
import { router } from "expo-router";
import { API_URL, OrderStatus } from "@/constants/config";
// import Header from "@/components/header";
import Entypo from "@expo/vector-icons/Entypo";

export default function Order() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const response = useGetOrders();

  const renderItem = ({ item, index }) => (
    <TouchableOpacity onPress={() => router.replace(`/order/${item?._id}`)}>
      <View style={styles.itemContainer}>
        <View
          style={{
            display: "flex",
            justifyContent: "flex-start",
            flexDirection: "row",
            gap: 2,
          }}
        >
          <Text>{item?.customer?.firstName}</Text>
          <Text>{item?.customer?.firstName}</Text>
        </View>
        <View>
          <Text style={{ marginTop: 5, fontWeight: "600" }}>
            NGN{item?.totalAmount}
          </Text>
        </View>

        <View
          style={{
            ...styles.statusContainer,
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          {item?.status === OrderStatus.ORDER_PLACED && (
            <Text
              // onClick={handleReassignDriver}
              style={{
                backgroundColor: "#c67d2f",
                color: "#FFFFFF",
                paddingHorizontal: 8,
                paddingVertical: 4,
                borderRadius: 4,
                marginRight: 8,
                fontSize: 10,
                display: "flex",
                gap: 2,
              }}
            >
              <Entypo name="unread" size={10} color="white" />
              {"NOT PAID"}
            </Text>
          )}
          {(item?.status === OrderStatus.USER_HAS_PAID ||
            item?.status === OrderStatus.ORDER_READY_FOR_PICKUP) && (
            <Text
              // onClick={handleReassignDriver}
              style={{
                backgroundColor: "green",
                color: "#FFFFFF",
                paddingHorizontal: 8,
                paddingVertical: 4,
                borderRadius: 4,
                marginRight: 8,
                fontSize: 10,
                display: "flex",
                gap: 2,
              }}
            >
              PAID
            </Text>
          )}

          {item?.status === OrderStatus.ORDER_IN_TRANSIT && (
            <Text
              // onClick={() => handleStatus(OrderStatus.ORDER_COMPLETED)}
              className="text-orange-500 font-medium border px-4 text-[14px] p-1 rounded-full bg-orange-100 border-orange-500"
              style={{
                backgroundColor: "green",
                color: "#FFFFFF",
                paddingHorizontal: 8,
                paddingVertical: 4,
                borderRadius: 4,
                marginRight: 8,
                fontSize: 10,
                display: "flex",
                gap: 2,
              }}
            >
              Has Delivered
            </Text>
          )}
          {item?.status === OrderStatus.ORDER_IN_TRANSIT && (
            <Text
              // onClick={() => handleStatus(OrderStatus.ORDER_PLACED)}
              style={{
                backgroundColor: "red",
                color: "#FFFFFF",
                paddingHorizontal: 8,
                paddingVertical: 4,
                borderRadius: 4,
                marginRight: 8,
                fontSize: 10,
                display: "flex",
                gap: 2,
              }}
            >
              Has Returned
            </Text>
          )}
          {/* <Text style={styles.statusPaid}>Paid</Text> */}
          {/* <Text style={styles.statusPackaging}>Packaging</Text> */}
        </View>
      </View>
    </TouchableOpacity>
  );

  const handleEmpty = () => (
    <Text style={styles.emptyText}>
      No data available. Please try again later.
    </Text>
  );

  const separator = () => <View style={{ margin: 10 }}></View>;

  const endComponent = () => (
    <View style={styles.footerContainer}>
      <Text style={styles.footerText}>List ended</Text>
    </View>
  );

  if (response.loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="green" />
        <Text style={styles.loaderText}>Loading...</Text>
      </View>
    );
  }

  if (response.error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* <Header /> */}
      <FlatList
        // ListHeaderComponent={header}
        data={response.orders}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={handleEmpty}
        ItemSeparatorComponent={separator}
        ListFooterComponent={endComponent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    padding: 10,
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#666",
  },
  itemContainer: {
    padding: 10,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e9e9e9",
    borderRadius: 10,
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginTop: 18,
  },
  itemPhoneNumber: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#333",
    marginTop: 4,
  },
  itemDescription: {
    fontSize: 14,
    color: "#555",
    marginTop: 4,
  },
  itemIngredients: {
    fontSize: 14,
    color: "#777",
    marginTop: 4,
  },
  price: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#333",
    marginTop: 8,
    padding: 2,
  },
  statusContainer: {
    flexDirection: "row",
    marginTop: 8,
  },
  emptyText: {
    textAlign: "center",
    color: "#999",
    fontSize: 16,
    marginTop: 20,
  },
  separator: {
    marginVertical: 8,
  },
  footerContainer: {
    alignItems: "center",
    marginTop: 10,
  },
  footerText: {
    fontSize: 16,
    color: "#666",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loaderText: {
    marginTop: 10,
    fontSize: 16,
    color: "#666",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 18,
    color: "red",
    textAlign: "center",
  },
});
