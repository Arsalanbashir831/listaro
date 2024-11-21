import React from "react";
import { Form, Input, Button, Typography, Card } from "antd";

const AdminLogin = () => {
  const { Title, Text } = Typography;

  const handleLogin = (values) => {
    console.log("Login details:", values);
  };

  return (
    <div className="  min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
      <Card
        className="shadow-lg"
        style={{
         width:'30%',
          borderRadius: "10px",
          backgroundColor: "#fff",
        }}
      >
        <div className="text-center mb-6">
          <Title level={3} style={{ color: "#6b46c1" }}>
            Admin Login
          </Title>
          <Text type="secondary">Access your admin dashboard</Text>
        </div>

        <Form
          layout="vertical"
          onFinish={handleLogin}
          className="space-y-4"
          style={{ textAlign: "left" }}
        >
          {/* Username Field */}
          <Form.Item
            name="username"
            label={<span className="text-gray-700">Username</span>}
            rules={[{ required: true, message: "Please enter your username" }]}
          >
            <Input
              placeholder="Enter your username"
              className="rounded-lg"
              style={{ padding: "10px", borderColor: "#d9d9d9" }}
            />
          </Form.Item>

          {/* Password Field */}
          <Form.Item
            name="password"
            label={<span className="text-gray-700">Password</span>}
            rules={[{ required: true, message: "Please enter your password" }]}
          >
            <Input.Password
              placeholder="Enter your password"
              className="rounded-lg"
              style={{ padding: "10px", borderColor: "#d9d9d9" }}
            />
          </Form.Item>

          {/* Login Button */}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full rounded-lg"
              style={{
                backgroundColor: "#6b46c1",
                borderColor: "#6b46c1",
                padding: "10px",
              }}
            >
              Login
            </Button>
          </Form.Item>

          {/* Forgot Password */}
          <div className="text-center mt-4">
            <Text type="secondary">
              Forgot your password?{" "}
              <a
                href="#"
                className="text-purple-700 hover:text-purple-800 transition-all"
              >
                Reset here
              </a>
            </Text>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default AdminLogin;
