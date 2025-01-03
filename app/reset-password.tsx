import React from "react";
import { View, Text } from "react-native";
import { InputField } from "../components/InputField";
import { Button } from "../components/Button";

const ResetPasswordScreen: React.FC = () => {
  return (
    <View className="flex-1 bg-white p-6 justify-center">
      <Text className="text-3xl font-bold text-primary mb-6 text-center">
        Reset Password
      </Text>
      <Text className="text-gray-600 text-center mb-4">
        Enter your new password below.
      </Text>
      <InputField placeholder="New Password" isPassword />
      <InputField placeholder="Confirm Password" isPassword />
      <Button
        title="Reset Password"
        onPress={() => console.log("Password reset")}
      />
    </View>
  );
};

export default ResetPasswordScreen;
