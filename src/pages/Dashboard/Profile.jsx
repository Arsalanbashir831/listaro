import React, { useContext } from "react";
import { Layout, Typography, Row, Col, Avatar, Divider, Space, List, Tag, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { UserContext } from "../../context/UserContext";
import { BASE_URL } from "../../utils/Constants";
import { SubscriptionContext } from "../../context/SubscriptionContext";

const { Title, Text } = Typography;
const { Content } = Layout;

const Profile = () => {
const {user}=  useContext(UserContext)
const {subscription} = useContext(SubscriptionContext)
  const userData = {
    name: user?.username,
    email: user?.email,
    status: user?.is_active ? 'Active':'Disable',
    picture :user?.picture

  };


// Convert to Date object
const dateObj = new Date(subscription?.end_date);

// Extract day, month, and year
const day = String(dateObj.getUTCDate()).padStart(2, "0");
const month = String(dateObj.getUTCMonth() + 1).padStart(2, "0"); // Months are zero-based
const year = dateObj.getUTCFullYear();


  return (
    <Layout style={{ background: "#ffff", minHeight: "100vh", padding: "20px" }}>
      <Content style={{ maxWidth: "100%" }}>
        <Row>
          {/* Header Section */}
          <Col span={24} style={{ textAlign: "left", marginBottom: "40px" }}>
            <Avatar src={ BASE_URL+userData.picture} size={120} icon={<UserOutlined />} />
            <Title level={3} style={{ marginTop: "20px", color: "#6a0dad" }}>
              {userData.name}
            </Title>
            <Text type="secondary">{userData.email}</Text>
          </Col>
        </Row>

        {/* Profile Details Section */}
        <Row gutter={24} style={{ marginBottom: "40px" }}>
          <Col span={12}>
            <Title level={4} style={{ color: "#6a0dad" }}>
              Personal Information
            </Title>
            <Divider />
            <Space direction="vertical" size="middle" style={{ width: "100%" }}>
              <Row>
                <Col span={8}>
                  <Text strong>Full Name:</Text>
                </Col>
                <Col span={16}>
                  <Text>{userData.name}</Text>
                </Col>
              </Row>
              <Row>
                <Col span={8}>
                  <Text strong>Email:</Text>
                </Col>
                <Col span={16}>
                  <Text>{userData.email}</Text>
                </Col>
              </Row>
              <Row>
                <Col span={8}>
                  <Text strong>Status:</Text>
                </Col>
                <Col span={16}>
                  <Tag color={userData.status ? "green" : "red"}>{userData.status}</Tag>
                </Col>
              </Row>
            </Space>
          </Col>
        </Row>

        {/* Account Details Section */}
        <Row gutter={24}>
          <Col span={24}>
            <Title level={4} style={{ color: "#6a0dad" }}>
              Subscription Details
            </Title>
            <Divider />
            <Space direction="vertical" size="middle" style={{ width: "100%" }}>
              <Row>
                <Col span={6}>
                  <Text strong>Subscription Plan:</Text>
                </Col>
                <Col span={18}>
                  <Text>{subscription?.plan} (Expires on: {day}/{month}/{year})</Text>
                </Col>
              </Row>
            
              <Row>
                <Col span={6}>
                  <Text strong>Used Listing :</Text>
                </Col>
                <Col span={18}>
                  <Text>{subscription?.used_listngs}</Text>
                </Col>
              </Row>
              <Row>
                <Col span={6}>
                  <Text strong>Used Keywords:</Text>
                </Col>
                <Col span={18}>
                  <Text>{subscription?.used_keywords}</Text>
                </Col>
              </Row>
              {/* Buttons for Upgrade and Cancel Plan */}
              <Row justify="end">
                <Space>
                  <Button type="primary" style={{ backgroundColor: "#6a0dad" }}>
                    Upgrade Plan
                  </Button>
                  <Button danger>Cancel Plan</Button>
                </Space>
              </Row>
            </Space>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default Profile;
