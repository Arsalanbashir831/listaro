import React, { createContext, useEffect, useState } from "react";
import { useApiRequest } from "../hooks/useApiRequest";

export const SubscriptionContext = createContext();

const SubscriptionProvider = ({ children }) => {
  const [subscription, setSubscription] = useState(null);
  const { makeApiRequest, loading } = useApiRequest();
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchSubscription = () => {
      makeApiRequest(
        "/users/get-subscription/",
        "GET",
        {},
        {
          Authorization: `Bearer ${token}`,
        }
      )
        .then((data) => {
          setSubscription(data?.data || null); 
        })
        .catch((e) => {
          console.error("Error fetching subscription:", e);
        });
    };

    fetchSubscription();

    const intervalId = setInterval(fetchSubscription, 3600000);

    return () => clearInterval(intervalId); // Clean up interval on component unmount
  }, [ token]);

  return (
    <SubscriptionContext.Provider value={{ subscription, setSubscription, loading }}>
      {children}
    </SubscriptionContext.Provider>
  );
};

export default SubscriptionProvider;
