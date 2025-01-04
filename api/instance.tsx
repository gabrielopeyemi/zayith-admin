import { API_URL } from "@/constants/config";
import axios from "axios";

   export const instance = axios.create({
        baseURL: API_URL,
      });

