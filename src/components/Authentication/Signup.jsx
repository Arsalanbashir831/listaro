import {
  GoogleOutlined,
 
} from "@ant-design/icons";
import { Input, Button, Space, Typography } from "antd";
import { useNavigation , useNavigate } from "react-router-dom";

const Signup = () => {
  const { Title, Text } = Typography;
const navigation = useNavigate();
  return (
    <>
      <Title level={2} style={{ textAlign: "center" }}>
        Signup
      </Title>

      <Space direction="vertical" size="middle" style={{ width: "100%" }}>
        <Input placeholder="Username" size="large" />
        <Input placeholder="Email" size="large" type="email" />
        <Input.Password placeholder="Password" size="large" />
        <Input.Password placeholder="Confirm Password" size="large" />

        <Button onClick={()=> navigation('/dashboard')} className="bg-purple-700" type="primary" size="large" block style={{ marginTop: "16px" }}>
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
        or signup with
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
          variant="filled"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            background:'#e30513',
            borderColor: "#db4437",
          }}
        >
         Continue with Google
        </Button>
       
      </Space>
    </>
  );
};

export default Signup;
