import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '@/constants/config';

// Define the User type based on your API response structure
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  // Add other fields returned by your API
}

// API endpoint
const FETCH_ALL_USER = `${API_URL}/users`; // Replace with your actual API endpoint

// API call function
const fetchAllUsers = async (role?: string | null) => {
  const response = await axios.get<User[]>(FETCH_ALL_USER, {
    params: { role },
  });
  return response.data; // Assuming the API response is the array of users directly
};

// Custom hook
const useFetchAllUsers = (role?: string | null) => {
  const [users, setUsers] = useState<User[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchAllUsers(role);
        setUsers(data);
      } catch (err: unknown) {
        console.log(err) 
        setError('An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [role]); // Re-fetch when the role changes

  return { users, loading, error };
};

export default useFetchAllUsers;
