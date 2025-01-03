import { useState } from "react";
import axios from "axios";
import { API_URL } from "../../constants/config.ts";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import useToast from "../useToast";

export const useChangePassword = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { showSuccess, showError } = useToast();

  const changePassword = async (
    oldPassword: string,
    password: string
  ): Promise<void> => {
    setLoading(true);
    setError(null); // Clear previous errors
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        showError("Unauthorized", "No token found. Please log in again.");
        router.replace("/login");
        return;
      }

      const response = await axios.post(
        `${API_URL}/users/change-password`,
        { oldPassword, password },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Attach the token here
          },
        }
      );

      showSuccess("Success", "Password has been reset!");
      router.replace("/settings");
    } catch (err: any) {
      console.log({ err: err.response?.data?.message });
      showError("Failed to Verify forget", err.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return { changePassword, loading, error };
};
