import { GoogleOutlined } from "@ant-design/icons";
import { Input, Button, Space, Typography, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

const Signup = () => {
  const { Title, Text } = Typography;
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = async () => {
    if (!username || !email || !password || !confirmPassword) {
      message.error("Please fill out all fields.");
      return;
    }

    if (password !== confirmPassword) {
      message.error("Passwords do not match.");
      return;
    }

    try {
      await register(username, email, password);
      message.success("Signup successful! Redirecting...");
    } catch (error) {
      message.error(error.message || "Signup failed. Please try again.");
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
        Create Your Account
      </Title>

      <Text
        style={{
          display: "block",
          textAlign: "center",
          color: "gray",
          marginBottom: "24px",
        }}
      >
        Sign up to access exclusive features
      </Text>

      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        {/* Username Input */}
        <Input
          placeholder="Username"
          size="large"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="rounded-lg"
          style={{
            padding: "12px",
            borderColor: "#d9d9d9",
            backgroundColor: "#f8f8fc",
          }}
        />

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

        {/* Confirm Password Input */}
        <Input.Password
          placeholder="Confirm Password"
          size="large"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="rounded-lg"
          style={{
            padding: "12px",
            borderColor: "#d9d9d9",
            backgroundColor: "#f8f8fc",
          }}
        />

        {/* Signup Button */}
        <Button
          onClick={handleSignup}
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
          Signup
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
        or sign up with
      </Text>

      <Space
        direction="vertical"
        size="middle"
        style={{
          width: "100%",
          marginTop: "16px",
        }}
      >
        {/* Google Signup Button */}
      
      </Space>
    </div>
  );
};

export default Signup;
