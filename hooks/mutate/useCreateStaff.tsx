import { API_URL } from "@/constants/config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import axios from 'axios';
import useToast from "../useToast";
import { router } from "expo-router";

/**
 * Function to create a staff member by sending a POST request to the API.
 *
 * @param {Object} data - The staff member data to create.
 * @returns {Promise<Object>} - The API response or an error.
 */
export const createStaff = async (data: any) => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }
  
      const response = await axios.post(`${API_URL}/users/addStaff`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
  
      console.log("Staff created successfully", response.data);
      return response.data;
    } catch (err: any) {
      console.error("Error creating staff", err);
      // throw new Error(err || "An error occurred while creating the staff member.");
    }
  };
  
  /**
   * Custom hook to create a staff member and manage loading/error states.
   *
   * @returns {Object} - { createStaffFn, loading, error }
   */
  export const useCreateStaff = () => {
    const { showSuccess, showError, showInfo } = useToast();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
  
    const createStaffFn = async (data: any) => {
      setLoading(true);
      setError(null);
  
      try {
        const response = await createStaff(data);
        showSuccess("Success!", "Staff created successfully");
        router.replace(`/settings`);
        return response;
      } catch (err: any) {
        setError(err.message || "An error occurred while creating the staff member.");
        throw err;
      } finally {
        setLoading(false);
      }
    };
  
    return { createStaffFn,  loading, error };
  };
  