import React, { useState } from "react";
import {
  Layout,
  Typography,
  Row,
  Col,
  Progress,
  Button,
  Divider,
  Card,
  Space,
  Tag,
} from "antd";

const { Title, Text } = Typography;
const { Content } = Layout;

const UserSubscription = () => {
  const [subscription, setSubscription] = useState({
    plan: "Premium Plan",
    status: "Active",
    creditsUsed: 70,
    totalCredits: 100,
    expiryDate: "December 31, 2023",
    price: "$29.99/month",
  });

  const handleCancelPlan = () => {
    alert("Plan cancellation initiated!");
  };

  const handleUpgradePlan = () => {
    alert("Redirecting to the upgrade page!");
  };

  return (
    <Layout style={{ background: "#f9f9f9", minHeight: "100vh", padding: "20px" }}>
      <Content style={{ maxWidth: "100%" }}>
        {/* Header Section */}
        <Title level={3} style={{ textAlign: "left", color: "#6a0dad" }}>
          Your Subscription
        </Title>
        <Divider />

        {/* Subscription Details */}
        <Row style={{ marginBottom: "40px" }}>
          <Col span={24}>
            <Title level={4} style={{ color: "#6a0dad" }}>
              Current Plan
            </Title>
            <Text>
              <strong>Plan:</strong> {subscription.plan}
            </Text>
            <br />
            <Text>
              <strong>Status:</strong>{" "}
              <Tag color={subscription.status === "Active" ? "green" : "red"}>
                {subscription.status}
              </Tag>
            </Text>
            <br />
            <Text>
              <strong>Expiry Date:</strong> {subscription.expiryDate}
            </Text>
            <br />
            <Text>
              <strong>Price:</strong> {subscription.price}
            </Text>
          </Col>
        </Row>

        {/* Credit Usage Section */}
        <Row style={{ marginBottom: "40px" }}>
          <Col span={24}>
            <Title level={4} style={{ color: "#6a0dad" }}>
              Credit Usage
            </Title>
            <Progress
              percent={(subscription.creditsUsed / subscription.totalCredits) * 100}
              status="active"
              showInfo
              style={{ marginBottom: "20px" }}
            />
            <Text>
              <strong>Credits Used:</strong> {subscription.creditsUsed} of {subscription.totalCredits}
            </Text>
          </Col>
        </Row>

        {/* Actions Section */}
        <Row justify="center" style={{ marginTop: "40px" , gap:10}} >
          <Col span={6}>
            <Button 
              type="primary"
              danger
              onClick={handleCancelPlan}
              style={{ width: "100%", background: "#ff4d4f", borderColor: "#ff4d4f" }}
            >
              Cancel Current Plan
            </Button>
          </Col>
          <Col span={6}>
            <Button
              type="primary"
              onClick={handleUpgradePlan}
              style={{ width: "100%", background: "#6a0dad", borderColor: "#6a0dad" }}
            >
              Upgrade Plan
            </Button>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default UserSubscription;
