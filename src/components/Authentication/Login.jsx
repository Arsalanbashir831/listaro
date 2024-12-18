import { GoogleOutlined } from "@ant-design/icons";
import { Input, Button, Space, Typography, message } from "antd";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useState } from "react";
import VerificationModal from "../modals/VerificationModal";

const Login = () => {
  const { Title, Text } = Typography;
  const { login, requestPasswordReset } = useContext(AuthContext); // Add requestPasswordReset from context
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      message.error("Please enter your email and password.");
      return;
    }

    try {
      await login(email, password);
      message.success("Login successful!");
    } catch (error) {
      console.error("Login error:", error);
      message.error(
        error.message || "An unexpected error occurred. Please try again."
      );
    }
  };

  const handleForgotPassword = async (data) => {
    // Function to handle the forgot password process
    try {
      await requestPasswordReset(data.email);
      message.success("OTP sent to your email. Please check your inbox.");
      setIsModalVisible(false); // Close modal after successful OTP request
    } catch (error) {
      console.error("Error requesting password reset:", error);
      message.error(
        error.message || "Failed to request password reset. Please try again."
      );
    }
  };

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-white shadow-lg rounded-lg max-w-md mx-auto">
      <Title
        level={2}
        style={{
          textAlign: "center",
          color: "#6b46c1",
          fontWeight: "bold",
        }}
      >
        Welcome Back
      </Title>

      <Text
        style={{
          display: "block",
          textAlign: "center",
          color: "gray",
          marginBottom: "24px",
        }}
      >
        Please log in to your account
      </Text>

      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        {/* Email Input */}
        <Input
          placeholder="Email Address"
          size="large"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="rounded-lg"
          style={{
            padding: "12px",
            borderColor: "#d9d9d9",
            backgroundColor: "#f8f8fc",
          }}
        />

        {/* Password Input */}
        <Input.Password
          placeholder="Password"
          size="large"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="rounded-lg"
          style={{
            padding: "12px",
            borderColor: "#d9d9d9",
            backgroundColor: "#f8f8fc",
          }}
        />

        {/* Forgot Password */}
        <div className="flex justify-end">
          <a
            className="text-purple-700 hover:underline text-sm"
            style={{ fontWeight: "bold" }}
            onClick={() => setIsModalVisible(true)} // Show modal on click
          >
            Forgot Password?
          </a>
        </div>

        {/* Login Button */}
        <Button
          onClick={handleLogin}
          type="primary"
          size="large"
          block
          className="rounded-lg"
          style={{
            backgroundColor: "#6b46c1",
            borderColor: "#6b46c1",
            fontWeight: "normal",
            letterSpacing: "0.5px",
          }}
        >
          Login
        </Button>
      </Space>

      <Text
        style={{
          display: "block",
          textAlign: "center",
          marginTop: "16px",
          color: "gray",
        }}
      >
        or continue with
      </Text>

      <Space
        direction="vertical"
        size="middle"
        style={{
          width: "100%",
          marginTop: "16px",
        }}
      >
      
      
      </Space>

      <VerificationModal
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onVerify={handleForgotPassword}
        type="forgotPassword"
      />
    </div>
  );
};

export default Login;
