import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { InputField } from "@/components/InputField";
import { router } from "expo-router";
import { Button } from "@/components/Button";
import Toast from "react-native-toast-message";
import { useLogin } from "@/hooks/queries/useLogin";

const index = () => {
  const [email, setEmail] = useState("famosipe2010@gmail.com");
  const [password, setPassword] = useState("P@ssw0rd");
  const { login, loading, error } = useLogin();

  const handleLogin = async () => {
    await login(email, password);
  };

  return (
    <View className="flex-1 bg-white p-6 justify-center">
      <Text className="text-3xl font-bold text-primary mb-6 text-center">
        Login
      </Text>
      <InputField
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <InputField
        placeholder="Password"
        isPassword
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Log In" onPress={handleLogin} isLoading={loading} />
      <TouchableOpacity>
        <Text className="text-primary text-center mt-4">Forgot Password?</Text>
      </TouchableOpacity>
    </View>
  );
};

export default index;
