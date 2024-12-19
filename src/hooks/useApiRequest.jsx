import {  useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/Constants";

export const useApiRequest = () => {
    const [loading, setLoading] = useState(false);
   
    const [error, setError] = useState(null);

  const makeApiRequest = async (endpoint, method, payload = {}, headers = {}) => {
    try {
      setLoading(true);
      setError(null); 
      const response = await axios({
        url: `${BASE_URL}${endpoint}`,
        method: method,
        data: payload,
        headers: headers,
    
      });
     
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      let errorMessage = "An unknown error occurred.";
      if (error.response && error.response.data?.error === "No active subscription found.") {
          errorMessage = "No active subscription found.";
      } else if (error.response) {
          errorMessage = error.response.data.non_field_errors?.[0] || error.response.data?.message || error.response.statusText;
      } else if (error.request) {
          errorMessage = "No response received from the server. Please try again.";
      } else {
          errorMessage = error.message;
      }
      setError(errorMessage);
      return {
          success: false,
          error: errorMessage,
      };
  } 
    
    finally {
      setLoading(false); 
    }
  };

  return { makeApiRequest, loading, error };
};
