import { API_URL, storeId } from "@/constants/config";
import axios from "axios";
import { useState, useEffect } from "react";

const FETCH_ALL_CUSTOMER = "path-to-fetch-all-customer";

export const useFetchAllCustomers = (
  status?: any,
  initialLimit = 10,
  initialPage = 1
) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  const [limit, setLimit] = useState(initialLimit);
  const [page, setPage] = useState(initialPage);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response: any = await axios.get(
          `${API_URL}/customer-management`,
          {
            params: { status, limit, page, storeId },
          }
        );
        setData(response.data);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (storeId) {
      fetchData();
    }
  }, [storeId, status, limit, page]);

  return {
    data,
    loading,
    error,
    setLimit,
    setPage,
  };
};
