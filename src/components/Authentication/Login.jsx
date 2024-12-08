import { GoogleOutlined } from "@ant-design/icons";
import { Input, Button, Space, Typography, message } from "antd";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useState } from "react";

const Login = () => {
  const { Title, Text } = Typography;
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
            href="#"
            className="text-purple-700 hover:underline text-sm"
            style={{ fontWeight: "bold" }}
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
        {/* Google Login Button */}
        <Button
          type="default"
          icon={<GoogleOutlined />}
          size="large"
          block
          className="rounded-lg"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "bold",
            color: "#fff",
            background: "#e30513",
            borderColor: "#db4437",
          }}
        >
          Continue with Google
        </Button>
      </Space>
    </div>
  );
};

export default Login;
