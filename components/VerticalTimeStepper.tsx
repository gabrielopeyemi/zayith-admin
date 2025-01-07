import React from "react";
import { View, Text } from "react-native";

const VerticalTimeStepper = ({ steps, currentStatus }) => {
  console.log({ steps, currentStatus });
  return (
    <View >
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
            className={`text-[12px] ${
              step.value === currentStatus
                ? "text-green-500 font-bold"
                : "text-gray-700"
            }`}
          >
            {step.label}
          </Text>
        </View>
      ))}
    </View>
  );
};

export default VerticalTimeStepper;
