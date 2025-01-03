import { useState } from "react";
import axios from "axios";
import { API_URL } from "../../constants/config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import useToast from "../useToast";

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { showSuccess, showError, showInfo } = useToast();

  const login = async (email: string, password: string): Promise<void> => {
    setLoading(true);
    setError(null); // Clear previous errors
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        credential: email.toLowerCase(),
        password,
      });
      console.log({ response: response?.data?.data });
      const { data, success } = response?.data?.data;
      await AsyncStorage.setItem("token", data.token);
      await AsyncStorage.setItem(
        "userDetail",
        JSON.stringify(data.userDetails)
      );
      router.replace("/dashboard");
    } catch (err: any) {
      console.log({ err: err.response?.data?.message });
      if (axios.isAxiosError(err)) {
        showError("Failed to login", err.response?.data?.message);
        setError(err.response?.data?.message || "An error occurred");
      } else {
        showError("Failed to login", "Network error");
        setError("Network error");
      }
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
};
