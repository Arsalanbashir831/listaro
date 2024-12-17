import React, { useEffect, useState } from "react";
import { Row, Col, Switch, Typography, Spin } from "antd";
import PricePlanCard from "../../components/PricePlan/PricePlanCard";
import { useApiRequest } from "../../hooks/useApiRequest";

const PricingLayout = () => {
  const { Text } = Typography;

  // State to manage billing cycle (monthly/annual)
  const [isAnnual, setIsAnnual] = useState(true);
  const [plans, setPlans] = useState([]);
  const { makeApiRequest, loading } = useApiRequest();

  // Fetch pricing plans from API
  useEffect(() => {
    makeApiRequest("/users/plans/", "GET")
      .then((response) => {
        if (response?.data?.plans) {
          setPlans(response.data.plans);
        } else {
          console.error("Invalid response format:", response);
        }
      })
      .catch((error) => {
        console.error("Error fetching plans:", error);
      });
  }, []);

  // Adjust prices based on billing cycle
  const adjustedPlans = plans
  .filter((plan) => (isAnnual ? plan.name.includes("Annual") : plan.name.includes("Monthly")))
  .map((plan) => {
    const monthlyPrice = isAnnual ? plan.price / 12 : plan.price; 
    return {
      id: plan.id,
      title: plan.name.split(" ")[0],
      price: `$${monthlyPrice.toFixed(0)} / month`, 
      description: plan.description,
      features: Object.values(plan.features).map((feature) =>
        typeof feature === "string" ? feature : String(feature)
      ), 
      buttonLabel: "Choose Plan",
      stripePriceId: plan.stripe_price_id,
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
      {loading ? (
        <div style={{ textAlign: "center", padding: "40px 0" }}>
          <Spin size="large" />
        </div>
      ) : (
        <Row
          gutter={[24, 24]}
          justify="center"
          style={{ maxWidth: "1200px", margin: "0 auto" }}
        >
          {adjustedPlans.map((plan) => (
            <Col key={plan.id} xs={24} sm={12} md={6}>
              <PricePlanCard {...plan} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default PricingLayout;
