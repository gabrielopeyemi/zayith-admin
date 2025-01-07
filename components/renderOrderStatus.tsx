// import { OrderData } from './path-to-order-data'; // adjust the import path accordingly
import { orderStatusData } from "@/constants/config";
import { Entypo } from "@expo/vector-icons"; // make sure to import the Entypo icon component
import React from "react";
import { View, Text } from "react-native";

// Function to render the status
const OrderStatusDiv = (props) => {
  const statusItem = orderStatusData.find(
    (item) => item.value === props.status
  );
  console.log({ FH1: props, orderStatusData, statusItem });

  if (!statusItem) return null;

  let statusText = statusItem.value;
  let bgColor = "bg-yellow-600"; // Default color for ORDER_PLACED
  let textColor = "text-white";

  // Custom logic to change styles based on the status value
  if (
    statusText === "PAYMENT COMPLETED" ||
    statusText === "ORDER READY FOR PICKUP/DELIVERY"
  ) {
    bgColor = "bg-green-600";
    statusText = "PAID"; // Adjust status text accordingly
  } else if (statusText === "ORDER IN TRANSIT") {
    bgColor = "bg-green-600";
    statusText = "Has Delivered"; // Adjust for this specific case
  } else if (statusText === "ORDER_RETURNED") {
    bgColor = "bg-red-600";
    statusText = "Has Returned"; // Adjust for this specific case
  }

  return (
    <View
      className={`${bgColor} ${textColor} px-2 py-1 rounded text-xs flex flex-row items-center gap-1 w-[fit-content]`}
    >
      <Entypo name="unread" size={10} color="white" />
      <Text key={statusItem.label} className="text-[#fff] text-[10px]">
        {statusText}
      </Text>
    </View>
  );
};

// Usage in the component
export default OrderStatusDiv;
