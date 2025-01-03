import axios from "axios";
import { API_URL } from "@/constants/config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

/**
 * Function to edit a product by sending a PATCH request to the API.
 *
 * @param {Object} data - The product data to update, including `productId`.
 * @returns {Promise<Object>} - The API response or an error.
 */
export const editProduct = async (data) => {
  const { productId, ...rest } = data;

  try {
    const token = await AsyncStorage.getItem("token");
    if (!token) {
      throw new Error("No authentication token found");
    }

    const response = await axios.patch(`${API_URL}/products/${productId}`, rest, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    console.log("Product updated successfully", {'response.data':  response.data});
    router.replace(`/home/${response?.data?._id}`);
    return response.data;
  } catch (err: any) {
    console.error("Error updating product", err.message);
    throw new Error(err.message || "An error occurred while updating the product.");
  }
};
