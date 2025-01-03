import React from "react";
import { View, Text } from "react-native";

const VerticalTimeStepper = ({ steps, currentStatus }) => {
  return (
    <View className="flex flex-col items-start">
      {steps.map((step, index) => (
        <View key={step.value} className="flex-row items-center mb-4">
          {/* Circle Indicator */}
          <View
            className={`w-5 h-5 rounded-full flex items-center justify-center mr-4 ${
              step.value === currentStatus ? "bg-green-500" : "bg-gray-300"
            }`}
          >
            <Text className="text-white text-xs font-bold">{index + 1}</Text>
          </View>
          {/* Step Label */}
          <Text
            className={`text-base ${
              step.value === currentStatus ? "text-green-500 font-bold" : "text-gray-700"
            }`}
          >
            {step.label}
          </Text>
        </View>
      ))}
    </View>
  );
};

// Data
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

// Render Component
const App = () => {
  const currentStatus = "IN_TRANSIT"; // Dynamically set the current status

  return (
    <View>
      <VerticalTimeStepper steps={data} currentStatus={currentStatus} />
    </View>
  );
};

export default App;
