import React, { useState } from "react";
import { Row, Col, Switch, Typography } from "antd";
import PricePlanCard from "../../components/PricePlan/PricePlanCard";

const PricingLayout = () => {
  const { Text } = Typography;

  // State to manage billing cycle (monthly/annual)
  const [isAnnual, setIsAnnual] = useState(true);

  // Base plan prices
  const basePlans = [
    {
      title: "Standard",
      monthlyPrice: 139,
      description: "Perfect for new sellers looking to optimize their product listings with AI-powered tools.",
      features: [
        "50 listings/month",
        "5,000 keywords",
        "AI-Powered Product Title",
        "AI-Powered Description",
        "Keyword Generator",
        "Keyword Optimizations",
        "Bulk Listing Generation: 500 listings",
        "Platform-Tailored Listings: 1 platform",
        "Email Support",
      ],
      buttonLabel: "Choose Plan",
      color: "purple",
    },
    {
      title: "Pro",
      monthlyPrice: 499,
      description: "Ideal for scaling sellers who need advanced keyword optimization and tailored listings for more platforms.",
      features: [
        "500 listings/month",
        "10,000 keywords",
        "AI-Powered Product Title",
        "AI-Powered Description",
        "Keyword Generator",
        "Keyword Optimizations",
        "Bulk Listing Generation: 1,000 listings",
        "Platform-Tailored Listings: 2 platforms",
        "Custom Restricted Words",
        "Custom Brand Style",
        "Priority Email Support",
      ],
      buttonLabel: "Choose Plan",
      popular: true,
    },
    {
      title: "Business",
      monthlyPrice: 799,
      description: "Built for businesses that need to manage high-volume listings and maintain custom branding at scale.",
      features: [
        "1,000 listings/month",
        "15,000 keywords",
        "AI-Powered Product Title",
        "AI-Powered Description",
        "Keyword Generator",
        "Keyword Optimizations",
        "Bulk Listing Generation: 2,000 listings",
        "Platform-Tailored Listings: 4 platforms",
        "Custom Restricted Words",
        "Custom Brand Style",
        "Priority Email & Video Support",
      ],
      buttonLabel: "Choose Plan",
      color: "orange",
    },
    {
      title: "Enterprise",
      monthlyPrice: 1399,
      description: "Designed for enterprise-level clients who require maximum flexibility, unlimited platforms, and dedicated account management.",
      features: [
        "2,000 listings/month",
        "20,000 keywords",
        "AI-Powered Product Title",
        "AI-Powered Description",
        "Keyword Generator",
        "Keyword Optimizations",
        "Bulk Listing Generation: 5,000 listings",
        "Platform-Tailored Listings: Unlimited platforms",
        "Custom Restricted Words",
        "Custom Brand Style",
        "Dedicated Account Manager",
      ],
      buttonLabel: "Choose Plan",
      color:'green'
    },
  ];

  // Adjust prices based on billing cycle
  const plans = basePlans.map((plan) => {
    const price = isAnnual ? (plan.monthlyPrice * 12 * 0.8 )/12: plan.monthlyPrice; // 20% discount for annual plans
    return {
      ...plan,
      price: isAnnual
        ? `$${price.toFixed(0)} / month`
        : `$${plan.monthlyPrice} / month`,
    };
  });

  return (
    <div style={{ padding: "40px 0", background: "#f4f4f8" }}>
      {/* Monthly/Annual Toggle */}
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <Text style={{ color: "#6a0dad" }}>Monthly</Text>
        <Switch
        checked={isAnnual}
        onChange={() => setIsAnnual(!isAnnual)}
        // checkedChildren="On"
        // unCheckedChildren="Off"
        style={{
          margin: "0 8px",
          backgroundColor: isAnnual ? "#861bbf" : "gray", // Custom colors
        }}
      />
        <Text>
          Annual <span style={{ color: "#6a0dad" }}>20% off</span>
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
