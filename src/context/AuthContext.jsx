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
      // Custom error handling for specific status codes
      if (error.response && error.response.status === 400) {
        throw new Error("Invalid credentials. Please check your email and password.");
      } else if (error.response && error.response.status === 401) {
        navigate('/otp-verification',{state:{email:email}})
        throw new Error("Email not verified. Please check your inbox to verify your email.");
      } else {
        throw new Error(error.message || "Login failed. Please try again.");
      }
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
      if (result) {
        navigate("/otp-verification",{state:{email:email}});
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      throw new Error(error.message || "User Already Exist try with another username and email.");
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
          const newRefreshToken = refreshResult.data.refresh;
          localStorage.setItem("accessToken", newAccessToken);
          localStorage.setItem("refreshToken", newRefreshToken);
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
    if(location.pathname !='/' && location.pathname != '/pricing' &&location.pathname !='/register' && location.pathname!='/otp-verification' && location.pathname!='/contact'){
      validateAndRefreshToken();
    }
    if(location.pathname ==='/auth'  && accessToken!=null  && location.pathname!='/otp-verification'&& location.pathname!='/contact'){
      validateAndRefreshToken();
    }
    
  
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
