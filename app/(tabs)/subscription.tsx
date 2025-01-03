import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import { InputField } from "@/components/InputField";
import { router } from "expo-router";
import { Button } from "@/components/Button";
import Toast from "react-native-toast-message";

const index = () => {
  type AuthStackParamList = {
    Login: undefined;
    ForgotPassword: undefined;
    ResetPassword: undefined;
  };

  const showToast = () => {
    Toast.show({
      type: "success",
      text1: "Hello",
      text2: "This is some something 👋",
    });
  };

  return (
    <View className="flex-1 bg-white p-6 justify-center">
      <Text>Coming soon</Text>
    </View>
  );
};

export default index;
