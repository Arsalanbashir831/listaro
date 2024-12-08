import React, { createContext, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useApiRequest } from "../hooks/useApiRequest";
import RedirectingSpinner from "../components/_common/RedirectingSpinner";

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken")
  );
  const { makeApiRequest, loading } = useApiRequest();
  const navigate = useNavigate();
  const location = useLocation();

  const initializeAuth = async (isValid) => {
    const currentPath = location.pathname;
    if (isValid) {
      if (currentPath === "/auth") {
        navigate("/dashboard");
      }
    } else {
      navigate("/auth");
    }
  };
  const login = async (email, password) => {
    try {
      const result = await makeApiRequest(
        "/auth/login/",
        "POST",
        { email, password },
        { "Content-Type": "application/json" }
      );

      if (result.success) {
        const { access, refresh } = result.data;
        localStorage.setItem("accessToken", access);
        localStorage.setItem("refreshToken", refresh);
        setAccessToken(access);
        navigate("/dashboard");
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      throw new Error(error.message || "Login failed.");
    }
  };

  const logout = async () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setAccessToken(null);
    navigate("/auth");
  };

  const register = async (username, email, password) => {
    try {
      const result = await makeApiRequest(
        "/auth/register/",
        "POST",
        { email, password, username },
        { "Content-Type": "application/json" }
      );

      if (result.success) {
        const { access, refresh } = result.data;
        localStorage.setItem("accessToken", access);
        localStorage.setItem("refreshToken", refresh);
        setAccessToken(access);
        navigate("/dashboard");
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      throw new Error(error.message || "Registration failed.");
    }
  };

  const validateAndRefreshToken = async () => {
    const refreshTokenValue = localStorage.getItem("refreshToken");

    if (!refreshTokenValue) {
      logout();
      return false;
    }

    if (accessToken) {  
      const validationResult = await makeApiRequest(
        "/auth/token/verify/",
        "POST",
        { token: accessToken },
        { "Content-Type": "application/json" }
      );

      if (validationResult.success) {
        initializeAuth(true);
      } else {
        const refreshResult = await makeApiRequest(
          "/auth/token/refresh/",
          "POST",
          { refresh: refreshTokenValue },
          { "Content-Type": "application/json" }
        );

        if (refreshResult.success) {
          const newAccessToken = refreshResult.data.access;
          localStorage.setItem("accessToken", newAccessToken);
          setAccessToken(newAccessToken);
          return true;
        } else {
          logout();
          return false;
        }
      }
    }
  };

  useEffect(() => {
    validateAndRefreshToken();
  }, [accessToken, navigate, location.pathname]);

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        isAuthenticated: !!accessToken,
        login,
        logout,
        register,
        validateAndRefreshToken,
      }}
    >
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
        <>
      <RedirectingSpinner/>
        </>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};
