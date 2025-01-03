import { useState } from "react";
import axios from "axios";
import { API_URL } from "../../constants/config.ts";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import useToast from "../useToast";

export const useVerifyForget = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { showSuccess, showError, showInfo } = useToast();

  const VerifyForgetPassword = async (
    phoneNumber: string,
    password: string,
    otp: string
  ): Promise<void> => {
    setLoading(true);
    setError(null); // Clear previous errors
    try {
      const response = await axios.post(
        `${API_URL}/users/verify-reset-password-otp`,
        {
          phoneNumber: phoneNumber,
          password,
          otp,
        }
      );
      showSuccess("Success", "Password has been reset!");
      router.replace("/login");
    } catch (err: any) {
      console.log({ err: err.response?.data?.message });
      showError("Failed to Verify forget", err.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return { VerifyForgetPassword, loading, error };
};
