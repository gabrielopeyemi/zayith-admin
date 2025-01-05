import { API_URL, storeId } from "@/constants/config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useCallback } from "react";
import axios, { AxiosError } from "axios";
import useToast from "../useToast";
import { router } from "expo-router";
import Toast from "react-native-toast-message";

interface OrderData {
  orderId: string;
  status: string;
}

interface ApiResponse {
  success: boolean;
  data?: any;
  message: string;
}

/**
 * Custom hook to create a product and manage loading/error states.
 *
 * @returns {Object} - { createProductFn, loading, error }
 */
export const useUpdateStatus = ({ fetchOrder }: { fetchOrder: any }) => {
  const { showSuccess, showError, showInfo } = useToast();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const updateStatusFn = useCallback(
    async (data: OrderData | any): Promise<ApiResponse | null> => {
      setLoading(true);
      setError(null);
      console.log({ FH3: data });

      try {
        const response = await updateStatus(data);
        showSuccess("Success!", response?.message);
        fetchOrder();
        // router.replace(`order/status-update/${response.data?._id}`);
        return response;
      } catch (err) {
        const errorMessage = handleError(err);
        setError(errorMessage);
        showError("Error!", errorMessage);
        return null; // Return null to indicate failure
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { updateStatusFn, loading, error };
};

/**
 * Sends product data to the server.
 *
 * @param {ProductData} data - Product data to send.
 * @returns {Promise<ApiResponse>} - API response data.
 */
const updateStatus = async (data: OrderData): Promise<ApiResponse> => {
  const token = await AsyncStorage.getItem("token");
  console.log({ FH: data });
  if (!token) {
    throw new Error("No authentication token found");
  }

  try {
    const response = await axios.patch<ApiResponse>(
      `${API_URL}/order/status-update/${data.orderId}`,
      { status: data.status },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (err) {
    console.log({ err });
  }
};

/**
 * Handles errors and extracts a user-friendly message.
 *
 * @param {unknown} err - The error object.
 * @returns {string} - A user-friendly error message.
 */
const handleError = (err: unknown): string => {
  if (axios.isAxiosError(err)) {
    const axiosError = err as AxiosError<{ message: string }>;
    return (
      axiosError.response?.data?.message ||
      axiosError.message ||
      "An error occurred while processing your request."
    );
  }
  return (err as Error).message || "Something went wrong. Please try again.";
};

/**
 * Displays an error alert to the user.
 *
 * @param {string} message - The error message to display.
 */
// const showErrorAlert = (message: string) => {
//   Toast.success("Your item has been saved successfully.");
// };
