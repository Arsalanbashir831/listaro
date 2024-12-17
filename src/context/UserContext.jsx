import React, { createContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom"; // Import useLocation
import { useApiRequest } from "../hooks/useApiRequest";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { makeApiRequest } = useApiRequest();
  const location = useLocation(); // Get the current location

  useEffect(() => {
  
    const pathsToFetchUser = [ '/dashboard/user-subscription',"/dashboard/profile", "/dashboard/profile-settings"]; 
    
      const fetchUser = async () => {
        try {
          const token = localStorage.getItem("accessToken");
          if (!token) {
            throw new Error("No access token found");
          }

          const response = await makeApiRequest(
            "/users/get-user",
            "GET",
            {},
            {
              Authorization: `Bearer ${token}`,
            }
          );

          if (response.success) {
            setUser(response.data);
          } else {
            setError(response.error || "Failed to fetch user data");
          }
        } catch (err) {
          setError(err.message || "An error occurred while fetching user data");
        } finally {
          setLoading(false);
        }
      };

      fetchUser();
    
  }, [location.pathname]);

  return (
    <UserContext.Provider value={{ user, loading, error, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
