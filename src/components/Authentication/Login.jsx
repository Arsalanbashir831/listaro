import { GoogleOutlined } from "@ant-design/icons";
import { Input, Button, Space, Typography } from "antd";

const Login = () => {
  const { Title, Text } = Typography;

  return (
    <>
      <Title level={2} style={{ textAlign: "center" }}>
        Login
      </Title>

      <Space direction="vertical" size="middle" style={{ width: "100%" }}>
        <Input placeholder="Email" size="large" type="email" />
        <Input.Password placeholder="Password" size="large" />

        <Button type="primary" size="large" block style={{ marginTop: "16px" }}>
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
        style={{ width: "100%", marginTop: "16px" }}
      >
        <Button
          type="default"
          icon={<GoogleOutlined />}
          size="large"
          block
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            background: "#e30513",
            borderColor: "#db4437",
          }}
        >
          Continue with Google
        </Button>
      </Space>
    </>
  );
};

export default Login;
