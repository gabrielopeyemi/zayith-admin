import { useState } from "react";
import axios from "axios";
import { API_URL } from "../../constants/config.ts";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import useToast from "../useToast";

export const useForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { showSuccess, showError, showInfo } = useToast();

  const forgotPassword = async (
    credential: string,
    setView: (value: number) => void
  ): Promise<void> => {
    setLoading(true);
    setError(null); // Clear previous errors
    try {
      await axios.post(`${API_URL}/users/reset-password`, {
        phoneNumber: credential,
      });

      showSuccess("Success", "OTP has been sent to your number");
      setView(1);
    } catch (err: any) {
      console.log({ err: err.response?.data?.message });

      showError("Failed to reset password", err.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return { forgotPassword, loading, error };
};
