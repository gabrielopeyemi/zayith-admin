import { OrderStatus } from "@/constants/config";
import formatDateToReadableString from "@/utils/function/formatDateToReadableString";
import Entypo from "@expo/vector-icons/Entypo";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { ScrollView } from "react-native-reanimated/lib/typescript/Animated";
import { Button } from "./Button";
import { useUpdateStatus } from "@/hooks/mutate/useUpdateStatus";
import VerticalTimeStepper from "./VerticalTimeStepper";

// Refactor the PaymentStatus enum
export enum PaymentStatus {
  IN_PROGRESS = "IN_PROGRESS",
  AWAITING_SHIPMENT = "AWAITING_SHIPMENT",
  IN_TRANSIT = "IN_TRANSIT",
  DELIVERED = "DELIVERED",
  CANCELED = "CANCELED",
  DISPUTED = "DISPUTED",
  SHIPPED = "SHIPPED",
  FAILED = "FAILED",
  EXPIRED = "EXPIRED",
  REFUNDED = "REFUNDED",
}

// Sample data for dropdown
const data = [
  { label: "IN_PROGRESS", value: "IN_PROGRESS" },
  { label: "AWAITING_SHIPMENT", value: "AWAITING_SHIPMENT" },
  { label: "IN_TRANSIT", value: "IN_TRANSIT" },
  { label: "DELIVERED", value: "DELIVERED" },
  { label: "CANCELED", value: "CANCELED" },
  { label: "DISPUTED", value: "DISPUTED" },
  { label: "SHIPPED", value: "SHIPPED" },
  { label: "FAILED", value: "FAILED" },
  { label: "EXPIRED", value: "EXPIRED" },
  { label: "REFUNDED", value: "REFUNDED" },
];

export default function OrderDetailsTwo({ order, fetchOrder }) {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const { updateStatusFn, loading, error } = useUpdateStatus({ fetchOrder });

  // Function to determine available statuses
  const getAvailableStatuses = (currentStatus: OrderStatus) => {
    const excludedStatuses = {
      [OrderStatus.PAID]: [
        OrderStatus.PAID,
        OrderStatus.IN_PROGRESS,
        OrderStatus.AWAITING_SHIPMENT,
      ],
      [OrderStatus.IN_PROGRESS]: [
        OrderStatus.PAID,
        OrderStatus.IN_PROGRESS,
        OrderStatus.AWAITING_SHIPMENT,
      ],
      [OrderStatus.AWAITING_SHIPMENT]: [
        OrderStatus.PAID,
        OrderStatus.IN_PROGRESS,
        OrderStatus.AWAITING_SHIPMENT,
      ],
      [OrderStatus.SHIPPED]: [
        OrderStatus.PAID,
        OrderStatus.IN_PROGRESS,
        OrderStatus.AWAITING_SHIPMENT,
        OrderStatus.SHIPPED,
      ],
      [OrderStatus.DELIVERED]: [
        OrderStatus.PAID,
        OrderStatus.IN_PROGRESS,
        OrderStatus.AWAITING_SHIPMENT,
        OrderStatus.SHIPPED,
        OrderStatus.DELIVERED,
      ],
      [OrderStatus.CANCELED]: [
        OrderStatus.PAID,
        OrderStatus.IN_PROGRESS,
        OrderStatus.AWAITING_SHIPMENT,
        OrderStatus.SHIPPED,
        OrderStatus.DELIVERED,
        OrderStatus.CANCELED,
      ],
      [OrderStatus.DISPUTED]: [
        OrderStatus.PAID,
        OrderStatus.IN_PROGRESS,
        OrderStatus.AWAITING_SHIPMENT,
        OrderStatus.SHIPPED,
        OrderStatus.DELIVERED,
        OrderStatus.CANCELED,
        OrderStatus.DISPUTED,
      ],
      [OrderStatus.FAILED]: [
        OrderStatus.PAID,
        OrderStatus.IN_PROGRESS,
        OrderStatus.AWAITING_SHIPMENT,
        OrderStatus.SHIPPED,
        OrderStatus.DELIVERED,
        OrderStatus.CANCELED,
        OrderStatus.DISPUTED,
        OrderStatus.FAILED,
      ],
      [OrderStatus.EXPIRED]: [
        OrderStatus.PAID,
        OrderStatus.IN_PROGRESS,
        OrderStatus.AWAITING_SHIPMENT,
        OrderStatus.SHIPPED,
        OrderStatus.DELIVERED,
        OrderStatus.CANCELED,
        OrderStatus.DISPUTED,
        OrderStatus.FAILED,
        OrderStatus.EXPIRED,
      ],
      [OrderStatus.REFUNDED]: [
        OrderStatus.PAID,
        OrderStatus.IN_PROGRESS,
        OrderStatus.AWAITING_SHIPMENT,
        OrderStatus.SHIPPED,
        OrderStatus.DELIVERED,
        OrderStatus.CANCELED,
        OrderStatus.DISPUTED,
        OrderStatus.FAILED,
        OrderStatus.EXPIRED,
        OrderStatus.REFUNDED,
      ],
    };

    const excluded = excludedStatuses[currentStatus] || [];
    return data.filter((item) => !excluded.includes(item.value));
  };

  // Filtered status based on current order status
  const availableStatuses = getAvailableStatuses(order?.status);

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: "blue" }]}>Status</Text>
      );
    }
    return null;
  };

  const handleEmpty = () => (
    <Text
      style={{
        textAlign: "center",
        color: "#999",
        fontSize: 16,
        marginTop: 20,
      }}
    >
      No product available. Please try again later.
    </Text>
  );

  const handleUpdateOrder = () => {
    updateStatusFn({
      orderId: order?.id,
      status: value,
    });
  };

  return (
    <View style={styles.container}>
      {/* Order Details */}
      <View style={styles.headerSection}>
        <View className="flex justify-between w-full items-center mb-4">
          <Text className="text-30 text-[#999]"># {order?.orderNumber}</Text>
          <Text style={styles.date}>{order?.chosenDeliveryDate}</Text>
        </View>
        <View className="w-fit">
          <VerticalTimeStepper steps={data} currentStatus={order?.status} />
        </View>
      </View>

      {/* Progress */}
      <View style={styles.progressSection}>
        <View style={styles.estimatedDateContainer}>
          <Text style={styles.estimatedDateLabel}>Order created date:</Text>
          <Text style={styles.estimatedDate}>
            {formatDateToReadableString(order?.createdAt)}
          </Text>
        </View>
        <View style={styles.estimatedDateContainer}>
          <Text style={styles.estimatedDateLabel}>
            Estimated shipping date:
          </Text>
          <Text style={styles.estimatedDate}>
            {formatDateToReadableString(order?.chosenDeliveryDate)}
          </Text>
        </View>

        {/* Dropdown */}
        <View style={{ paddingTop: 20 }}>
          {renderLabel()}
          <Dropdown
            style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={availableStatuses} // Use filtered available statuses
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? "Select item" : "..."}
            searchPlaceholder="Search..."
            value={value}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={(item) => {
              setValue(item.value);
              setIsFocus(false);
            }}
            renderLeftIcon={() => (
              <AntDesign
                style={styles.icon}
                color={isFocus ? "blue" : "black"}
                name="Safety"
                size={20}
              />
            )}
          />
          <Button title="Save" onPress={() => console.log(value)} />
        </View>
      </View>

      {/* Customer Section */}
      <View style={styles.customerSection}>
        <Text className="text-lg mb-2">Customer</Text>
        <Text className="text-[md] text-[#999]">
          {order?.customer?.firstName || order?.billingAddress?.firstName}{" "}
          {order?.customer?.lastName || order?.billingAddress?.lastName}
        </Text>
        <Text className="text-[md] text-[#999]">
          {order?.billingAddress?.email}
        </Text>
        <Text className="text-[md] text-[#999]">
          {order?.billingAddress?.phoneNumber}
        </Text>
        <Text className="text-lg my-4">Shipping address</Text>
        <Text className="text-[md] text-[#999]">
          {order?.billingAddress?.firstName} {order?.billingAddress?.lastName}
        </Text>
        <Text className="text-[md] text-[#999]">
          {order?.billingAddress?.city}
        </Text>
        <Text className="text-[md] text-[#999]">
          {order?.billingAddress?.state}
        </Text>
        <Text className="text-[md] text-[#999]">Nigeria</Text>
      </View>

      {/* Price Section */}
      <View
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          padding: 10,
          width: "auto",
        }}
      >
        <View>
          <Text className="text-[md] text-[#999]">Total Product:</Text>
          <Text style={{ fontWeight: "bold" }}>{order?.subTotalAmount}</Text>
        </View>
        <View style={styles.priceSection}>
          <Text className="text-[md] text-[#999]">Total Delivery: </Text>
          <Text style={{ fontWeight: "bold" }}>{order?.deliveryCost}</Text>
        </View>
        <View style={styles.priceSection}>
          <Text className="text-[md] text-[#999]">Sum Total: </Text>
          <Text style={{ fontWeight: "bold" }}>{order?.subTotalAmount}</Text>
        </View>
      </View>

      <View
        style={{
          ...styles.customerSection,
          marginTop: 20,
          borderWidth: 1,
          borderColor: "#ccc",
        }}
      >
        <FlatList
          data={order?.items}
          renderItem={({ item }) => (
            <View style={styles.tableRow} className="p-4">
              <Text>{item?.product?.name}</Text>
              <Text>{item?.price}</Text>
            </View>
          )}
          ListEmptyComponent={handleEmpty}
          keyExtractor={(item) => item?.product?.id}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginTop: 10,
  },
  label: {
    fontSize: 18,
    color: "gray",
  },
  dropdown: {
    marginBottom: 5,
    height: 40,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  inputSearchStyle: {
    height: 30,
    fontSize: 16,
  },
  iconStyle: {
    width: 10,
    height: 10,
  },
  icon: {
    marginRight: 5,
  },
  progressSection: {
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  progressBarContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  progressBar: {
    height: 4,
    flex: 1,
  },
  green: {
    backgroundColor: "green",
  },
  yellow: {
    backgroundColor: "yellow",
  },
  gray: {
    backgroundColor: "gray",
  },
  processing: {
    textAlign: "center",
    marginTop: 10,
  },
  estimatedDateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  estimatedDateLabel: {
    fontWeight: "bold",
  },
  estimatedDate: {
    color: "gray",
  },
  Text: {
    marginTop: 10,
    alignItems: "center",
  },
  TextText: {
    color: "blue",
  },
  customerSection: {
    marginVertical: 16,
  },
  customerName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  email: {
    color: "gray",
  },
  phone: {
    color: "gray",
  },
  shippingAddressTitle: {
    marginTop: 10,
    fontWeight: "bold",
  },
  shippingAddress: {
    color: "gray",
  },
  priceSection: {
    marginVertical: 4,
    fontSize: 16,
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
});
