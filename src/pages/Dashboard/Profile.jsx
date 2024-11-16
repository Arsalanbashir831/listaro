import React from "react";
import { Layout, Typography, Row, Col, Avatar, Divider, Space, List, Tag } from "antd";
import { UserOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;
const { Content } = Layout;

const Profile = () => {
  const userData = {
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "+1234567890",
    joinDate: "January 10, 2023",
    status: "Active",
  };

  const recentActivity = [
    "Logged in from a new device.",
    "Updated profile picture.",
    "Changed password.",
    "Enabled two-factor authentication.",
  ];

  return (
    <Layout style={{ background: "#f9f9f9", minHeight: "100vh", padding: "20px" }}>
      <Content style={{ maxWidth: "100%" }}>
        <Row>
          {/* Header Section */}
          <Col span={24} style={{ textAlign: "left", marginBottom: "40px" }}>
            <Avatar size={120} icon={<UserOutlined />} />
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
                  <Text strong>Phone:</Text>
                </Col>
                <Col span={16}>
                  <Text>{userData.phone}</Text>
                </Col>
              </Row>
              <Row>
                <Col span={8}>
                  <Text strong>Joined On:</Text>
                </Col>
                <Col span={16}>
                  <Text>{userData.joinDate}</Text>
                </Col>
              </Row>
              <Row>
                <Col span={8}>
                  <Text strong>Status:</Text>
                </Col>
                <Col span={16}>
                  <Tag color={userData.status === "Active" ? "green" : "red"}>{userData.status}</Tag>
                </Col>
              </Row>
            </Space>
          </Col>

          {/* Recent Activity Section */}
          <Col span={12}>
            <Title level={4} style={{ color: "#6a0dad" }}>
              Recent Activity
            </Title>
            <Divider />
            <List
              dataSource={recentActivity}
              renderItem={(item) => (
                <List.Item>
                  <Text>{item}</Text>
                </List.Item>
              )}
            />
          </Col>
        </Row>

        {/* Account Details Section */}
        <Row gutter={24}>
          <Col span={24}>
            <Title level={4} style={{ color: "#6a0dad" }}>
              Account Details
            </Title>
            <Divider />
            <Space direction="vertical" size="middle" style={{ width: "100%" }}>
              <Row>
                <Col span={6}>
                  <Text strong>Subscription Plan:</Text>
                </Col>
                <Col span={18}>
                  <Text>Premium Plan (Expires on: December 31, 2023)</Text>
                </Col>
              </Row>
              <Row>
                <Col span={6}>
                  <Text strong>Storage Used:</Text>
                </Col>
                <Col span={18}>
                  <Text>15GB of 50GB</Text>
                </Col>
              </Row>
              <Row>
                <Col span={6}>
                  <Text strong>Last Payment:</Text>
                </Col>
                <Col span={18}>
                  <Text>$29.99 on October 15, 2023</Text>
                </Col>
              </Row>
            </Space>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default Profile;
