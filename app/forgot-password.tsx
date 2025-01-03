import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { InputField } from "../components/InputField";
import { Button } from "../components/Button";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type AuthStackParamList = {
  ForgotPassword: undefined;
  Login: undefined;
};

type ForgotPasswordScreenProps = NativeStackScreenProps<AuthStackParamList, "ForgotPassword">;

const ForgotPasswordScreen: React.FC<ForgotPasswordScreenProps> = ({ navigation }) => {
  return (
    <View className="flex-1 bg-white p-6 justify-center">
      <Text className="text-3xl font-bold text-primary mb-6 text-center">Forgot Password</Text>
      <Text className="text-gray-600 text-center mb-4">
        Enter your email address to receive a reset password link.
      </Text>
      <InputField placeholder="Email" keyboardType="email-address" autoCapitalize="none" />
      <Button title="Send Reset Link" onPress={() => console.log("Reset link sent")} />
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text className="text-primary text-center mt-4">Back to Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ForgotPasswordScreen;
