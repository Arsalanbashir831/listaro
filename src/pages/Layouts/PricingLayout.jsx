import React from "react";
import { Row, Col, Switch, Typography, Divider } from "antd";
import PricePlanCard from "../../components/PricePlan/PricePlanCard";

const PricingLayout = () => {
  const { Title, Text } = Typography;

  const plans = [
    {
      title: "Free",
      price: "$0",
      description: "Ideal for hobby projects, prototypes, and testing.",
      features: ["5 code copies", "20 code inspects", "Hosting: 5 screens, 1 project"],
      buttonLabel: "Current Plan",
    },
    {
      title: "Pro",
      price: "$24 / month",
      description: "Ideal for exporting code for full flows and website publishing.",
      features: [
        "5,000 code exports",
        "Unlimited code inspects",
        "128k prompt context window",
        "Hosting: 30 screens, 3 projects",
        "Export React/HTML",
        "Custom domains",
        "Priority support",
        "+10 bonus screens",
      ],
      buttonLabel: "Upgrade",
      popular: true,
    },
    {
      title: "Business",
      price: "$150 / month",
      description: "Ideal for teams building at scale and free integration.",
      features: [
        "50,000 code exports",
        "Unlimited code inspects",
        "128k prompt context window",
        "Hosting: 150 screens, 15 projects",
        "Export React/HTML",
        "Custom domains",
        "Premium support",
      ],
      buttonLabel: "Upgrade",
    },
    {
      title: "Enterprise",
      price: "Custom",
      description: "Ideal for mature teams needing secure and scalable solutions.",
      features: [
        "Unlimited code exports",
        "Code reuse for Frontier",
        "Custom design system",
        "SSO",
        "SOC2 Type II - Trust center",
        "Advanced Compliance & Security",
        "Private cloud",
        "Premium support",
      ],
      buttonLabel: "Contact Us",
    },
  ];

  return (
    <div style={{ padding: "40px 0", background: "#f4f4f8" }}>
  

      {/* Monthly/Annual Toggle */}
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <Text style={{ color: "#6a0dad" }}>Monthly</Text>
        <Switch
          style={{ margin: "0 8px", backgroundColor: "#6a0dad" }}
          defaultChecked
        />
        <Text>
          Annual <span style={{ color: "#6a0dad" }}>up to 51% off</span>
        </Text>
      </div>

      {/* Pricing Cards */}
      <Row
        gutter={[24, 24]}
        justify="center"
        style={{ maxWidth: "1200px", margin: "0 auto" }}
      >
        {plans.map((plan, index) => (
          <Col key={index} xs={24} sm={12} md={6}>
            <PricePlanCard {...plan} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default PricingLayout;
